import { useCallback, useEffect, useRef, useState } from 'react'

// Interactive illustration of the EchoSafe pipeline: a sound arrives, the four mics hear it in
// order, the classifier names it, and the motor on that side buzzes. Timings and geometry are
// illustrative, not live device data.

const C = 200 // centre of the 400x400 viewBox
const R_SRC = 168
const PX_TO_M = 0.15 / 140 // head width in the drawing (~140px) ≈ 15 cm

const MICS = [
  { id: 'FL', name: 'front-left', x: 146, y: 142 },
  { id: 'FR', name: 'front-right', x: 254, y: 142 },
  { id: 'RR', name: 'rear-right', x: 258, y: 262 },
  { id: 'RL', name: 'rear-left', x: 142, y: 262 },
]

const SOUNDS = [
  { id: 'siren', label: 'Siren', alert: true },
  { id: 'horn', label: 'Car horn', alert: true },
  { id: 'bell', label: 'Bike bell', alert: true },
  { id: 'noise', label: 'Background noise', alert: false },
]

const CLASSES = [
  { id: 'horn', label: 'Horn' },
  { id: 'bell', label: 'Bell' },
  { id: 'siren', label: 'Siren' },
  { id: 'gunshot', label: 'Gunshot' },
  { id: 'noise', label: 'Noise' },
]

const DIRECTIONS = [
  { label: 'Front', deg: 0 },
  { label: 'Front right', deg: 45 },
  { label: 'Right', deg: 90 },
  { label: 'Back right', deg: 135 },
  { label: 'Back', deg: 180 },
  { label: 'Back left', deg: 225 },
  { label: 'Left', deg: 270 },
  { label: 'Front left', deg: 315 },
]

function synth(ctx, sound, pan) {
  const now = ctx.currentTime
  const out = ctx.createGain()
  const panner = ctx.createStereoPanner()
  panner.pan.value = pan
  out.connect(panner).connect(ctx.destination)
  out.gain.setValueAtTime(0.0001, now)
  out.gain.exponentialRampToValueAtTime(0.16, now + 0.04)

  if (sound === 'siren') {
    const o = ctx.createOscillator()
    o.type = 'sine'
    o.frequency.setValueAtTime(650, now)
    o.frequency.linearRampToValueAtTime(1300, now + 0.6)
    o.frequency.linearRampToValueAtTime(650, now + 1.2)
    o.connect(out)
    o.start(now)
    o.stop(now + 1.3)
    out.gain.exponentialRampToValueAtTime(0.0001, now + 1.3)
  } else if (sound === 'horn') {
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 1400
    lp.connect(out)
    ;[349, 440].forEach((f) => {
      const o = ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = f
      o.connect(lp)
      o.start(now)
      o.stop(now + 0.7)
    })
    out.gain.setValueAtTime(0.12, now + 0.6)
    out.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)
  } else if (sound === 'bell') {
    ;[0, 0.28].forEach((t) => {
      ;[2400, 3600].forEach((f, i) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.frequency.value = f
        g.gain.setValueAtTime(i ? 0.5 : 1, now + t)
        g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.6)
        o.connect(g).connect(out)
        o.start(now + t)
        o.stop(now + t + 0.65)
      })
    })
    out.gain.exponentialRampToValueAtTime(0.0001, now + 1)
  } else {
    const len = ctx.sampleRate * 0.8
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.5
    const src = ctx.createBufferSource()
    src.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 700
    src.connect(bp).connect(out)
    src.start(now)
    out.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)
  }
}

export default function EchoSafeDemo() {
  const [sound, setSound] = useState('siren')
  const [shot, setShot] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | listening | alert
  const [audioOn, setAudioOn] = useState(false)
  const audioRef = useRef(null)
  const timers = useRef([])
  const svgRef = useRef(null)
  const autoPlayed = useRef(false)

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const fire = useCallback(
    (deg, soundId = sound, withAudio = audioOn) => {
      clearTimers()
      const rad = (deg * Math.PI) / 180
      const sx = C + R_SRC * Math.sin(rad)
      const sy = C - R_SRC * Math.cos(rad)
      const dists = MICS.map((m) => ({ ...m, dist: Math.hypot(m.x - sx, m.y - sy) }))
      const min = Math.min(...dists.map((m) => m.dist))
      const order = dists
        .map((m) => ({
          ...m,
          visualDelay: (m.dist - min) * 4.5,
          realMs: ((m.dist - min) * PX_TO_M * 1000) / 343,
        }))
        .sort((a, b) => a.dist - b.dist)
      const nearest = order.filter((m) => m.dist - min < 6).map((m) => m.id)
      const snd = SOUNDS.find((s) => s.id === soundId)
      setShot({ id: Date.now(), sx, sy, deg, sound: snd, order, nearest })
      setPhase('listening')
      const maxDelay = Math.max(...order.map((m) => m.visualDelay))
      timers.current.push(setTimeout(() => setPhase('alert'), maxDelay + 650))

      if (withAudio) {
        try {
          if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
          audioRef.current.resume()
          synth(audioRef.current, soundId, Math.max(-1, Math.min(1, Math.sin(rad))))
        } catch (e) {
          /* audio is a bonus; the visual still runs */
        }
      }
    },
    [sound, audioOn]
  )

  useEffect(() => () => clearTimers(), [])

  // Play one silent demo the first time the panel scrolls into view.
  useEffect(() => {
    const el = svgRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !autoPlayed.current) {
          autoPlayed.current = true
          timers.current.push(setTimeout(() => fire(225, 'siren', false), 500))
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [fire])

  const onSvgClick = (e) => {
    const r = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 400 - C
    const y = ((e.clientY - r.top) / r.height) * 400 - C
    if (Math.hypot(x, y) < 40) return
    const deg = ((Math.atan2(x, -y) * 180) / Math.PI + 360) % 360
    fire(deg)
  }

  const alerting = phase === 'alert' && shot?.sound.alert
  const detected = phase === 'alert' ? shot?.sound.id : null
  const nearestNames = shot ? MICS.filter((m) => shot.nearest.includes(m.id)).map((m) => m.name) : []

  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/[0.04] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="kicker text-lime">Try it · pick a sound</p>
        <button
          type="button"
          onClick={() => setAudioOn((a) => !a)}
          aria-pressed={audioOn}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-3 font-mono text-xs transition-colors hover:border-lime"
        >
          <span aria-hidden="true">{audioOn ? '🔊' : '🔈'}</span>
          {audioOn ? 'Sound on' : 'Sound off'}
        </button>
      </div>

      <div role="group" aria-label="Sound to play" className="mt-3 flex flex-wrap gap-2">
        {SOUNDS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={sound === s.id}
            onClick={() => setSound(s.id)}
            className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
              sound === s.id ? 'border-lime bg-lime text-ink' : 'border-white/25 hover:border-white/60'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="mx-auto block w-full max-w-[440px] cursor-crosshair touch-manipulation select-none"
          onClick={onSvgClick}
          role="img"
          aria-label="Top-down view of a head wearing EchoSafe, with four microphones and motors. Click around the head to send a sound from that direction."
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D5F542" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D5F542" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[60, 110, 160, 190].map((r) => (
            <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray="2 6" />
          ))}
          <text x={C} y={22} textAnchor="middle" className="font-mono" fontSize="11" fill="rgba(255,255,255,0.45)">
            FRONT
          </text>

          {shot &&
            [0, 160, 320].map((d) => (
              <circle
                key={`${shot.id}-${d}`}
                cx={shot.sx}
                cy={shot.sy}
                r="260"
                fill="none"
                stroke={shot.sound.alert ? '#FF5B23' : 'rgba(255,255,255,0.6)'}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="ripple"
                style={{ animationDelay: `${d}ms` }}
              />
            ))}

          {/* headband */}
          <path d="M120 250 Q200 330 280 250" fill="none" stroke="#D5F542" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          {/* head */}
          <ellipse cx={C} cy={C} rx="68" ry="84" fill="#1B1D22" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <path d="M188 118 L200 100 L212 118" fill="#1B1D22" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="130" cy="200" rx="9" ry="20" fill="#1B1D22" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
          <ellipse cx="270" cy="200" rx="9" ry="20" fill="#1B1D22" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

          {MICS.map((m) => {
            const hit = shot?.order.find((o) => o.id === m.id)
            const buzzing = alerting && shot.nearest.includes(m.id)
            return (
              <g key={`${m.id}-${shot?.id ?? 0}`}>
                {buzzing && <circle cx={m.x} cy={m.y} r="34" fill="url(#glow)" />}
                <g className={buzzing ? 'buzz' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r="15"
                    fill={buzzing ? '#FF5B23' : '#0F1013'}
                    stroke={buzzing ? '#FF5B23' : '#D5F542'}
                    strokeWidth="2"
                  />
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r="5.5"
                    fill="#D5F542"
                    className="mic-dot"
                    style={hit ? { animation: `mic-hit 0.5s ${hit.visualDelay}ms both` } : { opacity: 0.25 }}
                  />
                </g>
                <text
                  x={m.x + (m.x < C ? -24 : 24)}
                  y={m.y + 4}
                  textAnchor={m.x < C ? 'end' : 'start'}
                  className="font-mono"
                  fontSize="11"
                  fill="rgba(255,255,255,0.7)"
                >
                  {m.id}
                </text>
              </g>
            )
          })}

          {shot && (
            <g key={`src-${shot.id}`}>
              <circle cx={shot.sx} cy={shot.sy} r="10" fill={shot.sound.alert ? '#FF5B23' : '#F5F1E8'} />
              <circle cx={shot.sx} cy={shot.sy} r="16" fill="none" stroke={shot.sound.alert ? '#FF5B23' : '#F5F1E8'} strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-1.5 sm:grid-cols-8" aria-label="Or send the sound from a direction">
        {DIRECTIONS.map((d) => (
          <button
            key={d.deg}
            type="button"
            onClick={() => fire(d.deg)}
            className="min-h-[44px] rounded-xl border border-white/15 px-1 text-[11px] leading-tight text-white/80 transition-colors hover:border-lime hover:text-white"
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-2xl bg-black/40 p-4 font-mono text-[13px] tabular-nums sm:grid-cols-[1fr_auto]" aria-live="polite">
        <div className="space-y-1.5">
          {!shot && <p className="text-white/70">Click anywhere around the head to send a sound from there.</p>}
          {shot && (
            <>
              <p>
                <span className="text-white/50">heard by </span>
                {shot.order.map((o, i) => (
                  <span key={o.id}>
                    {i > 0 && <span className="text-white/40"> → </span>}
                    {o.id}
                    {i > 0 && <span className="text-white/50"> +{o.realMs.toFixed(2)}ms</span>}
                  </span>
                ))}
              </p>
              <p>
                <span className="text-white/50">classified </span>
                {phase === 'alert' ? shot.sound.label.toLowerCase() : 'listening…'}
              </p>
              <p>
                <span className="text-white/50">alert </span>
                {phase !== 'alert'
                  ? '…'
                  : shot.sound.alert
                    ? `buzz ${nearestNames.join(' + ')} motor`
                    : 'none, below the alert threshold'}
              </p>
            </>
          )}
        </div>
        <ul className="flex flex-wrap gap-1.5 sm:max-w-[11rem] sm:justify-end" aria-label="Classes the model knows">
          {CLASSES.map((c) => (
            <li
              key={c.id}
              className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                detected === c.id ? 'bg-lime text-ink' : 'bg-white/10 text-white/60'
              }`}
            >
              {c.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs text-white/50">An illustration of how the device works, not live data from it.</p>
    </div>
  )
}
