import { useEffect, useRef } from 'react'

// Circuit-board traces that carry little signal pulses. Pointer movement and clicks send
// new pulses down the nearest trace. Pure canvas, no libraries; it pauses off-screen and
// draws a still board when the visitor prefers reduced motion.

const GRID = 28
const COLORS = ['#FF5B23', '#1F45F5', '#FF5B23', '#141414']

function rand(a, b) {
  return a + Math.random() * (b - a)
}

function buildTraces(w, h) {
  const traces = []
  const count = Math.min(70, Math.round((w * h) / 16000))
  const dirs = [
    [1, 0],
    [1, 1],
    [1, -1],
    [0, 1],
    [0, -1],
  ]
  for (let i = 0; i < count; i++) {
    let x = Math.round(rand(0, w) / GRID) * GRID
    let y = Math.round(rand(0, h) / GRID) * GRID
    const flip = Math.random() < 0.5 ? -1 : 1
    const pts = [[x, y]]
    let dir = [1, 0]
    const segs = Math.floor(rand(3, 7))
    for (let s = 0; s < segs; s++) {
      const len = Math.floor(rand(2, 8)) * GRID
      x += dir[0] * flip * len
      y += dir[1] * len * (dir[0] ? 0.5 : 1)
      y = Math.round(y / (GRID / 2)) * (GRID / 2)
      pts.push([x, y])
      const options = dirs.filter((d) => d !== dir)
      dir = dir[1] !== 0 ? [1, 0] : options[Math.floor(Math.random() * options.length)]
    }
    const cum = [0]
    for (let k = 1; k < pts.length; k++) {
      cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]))
    }
    traces.push({ pts, cum, total: cum[cum.length - 1] })
  }
  return traces
}

function pointAt(tr, d) {
  const { pts, cum } = tr
  if (d <= 0) return pts[0]
  if (d >= tr.total) return pts[pts.length - 1]
  let k = 1
  while (cum[k] < d) k++
  const f = (d - cum[k - 1]) / (cum[k] - cum[k - 1] || 1)
  return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * f, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * f]
}

export default function SignalCanvas({ className = '', paused = false }) {
  const ref = useRef(null)
  const pausedRef = useRef(paused)
  const startRef = useRef(() => {})

  useEffect(() => {
    pausedRef.current = paused
    if (!paused) startRef.current()
  }, [paused])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let traces = []
    let samples = []
    let pulses = []
    let flashes = []
    let board = null
    let raf = 0
    let visible = true
    let last = performance.now()
    let lastSpawn = 0
    let lastPointer = 0
    const pointer = { x: -999, y: -999, active: false }

    const drawBoard = () => {
      board = document.createElement('canvas')
      board.width = w * dpr
      board.height = h * dpr
      const b = board.getContext('2d')
      b.scale(dpr, dpr)
      b.lineCap = 'round'
      b.lineJoin = 'round'
      b.strokeStyle = 'rgba(20,20,20,0.16)'
      b.lineWidth = 1.6
      traces.forEach((t) => {
        b.beginPath()
        t.pts.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y)))
        b.stroke()
      })
      b.fillStyle = '#F5F1E8'
      traces.forEach((t) => {
        ;[t.pts[0], t.pts[t.pts.length - 1]].forEach(([x, y]) => {
          b.beginPath()
          b.arc(x, y, 4, 0, Math.PI * 2)
          b.fill()
          b.stroke()
        })
      })
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = Math.max(1, r.width)
      h = Math.max(1, r.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      traces = buildTraces(w, h)
      samples = []
      traces.forEach((t, ti) => {
        for (let d = 0; d < t.total; d += 12) samples.push({ ti, d, p: pointAt(t, d) })
      })
      pulses = []
      drawBoard()
      render(0)
    }

    const spawn = (ti, d = 0) => {
      if (pulses.length > 40) return
      pulses.push({
        ti,
        d,
        speed: rand(160, 320),
        len: rand(36, 70),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const nearest = (x, y, radius) => {
      let best = null
      let bd = radius * radius
      for (const s of samples) {
        const dx = s.p[0] - x
        const dy = s.p[1] - y
        const dd = dx * dx + dy * dy
        if (dd < bd) {
          bd = dd
          best = s
        }
      }
      return best
    }

    const render = (dt) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      if (board) ctx.drawImage(board, 0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      pulses = pulses.filter((p) => {
        p.d += p.speed * dt
        const t = traces[p.ti]
        if (!t) return false
        const head = Math.min(p.d, t.total)
        const tail = Math.max(0, p.d - p.len)
        if (tail >= t.total) {
          flashes.push({ p: t.pts[t.pts.length - 1], life: 1, color: p.color })
          return false
        }
        ctx.strokeStyle = p.color
        ctx.lineWidth = 3
        ctx.beginPath()
        const steps = 8
        for (let i = 0; i <= steps; i++) {
          const [x, y] = pointAt(t, tail + ((head - tail) * i) / steps)
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
        }
        ctx.stroke()
        const [hx, hy] = pointAt(t, head)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(hx, hy, 3.2, 0, Math.PI * 2)
        ctx.fill()
        return true
      })

      flashes = flashes.filter((f) => {
        f.life -= dt * 1.8
        if (f.life <= 0) return false
        ctx.globalAlpha = f.life
        ctx.fillStyle = f.color
        ctx.beginPath()
        ctx.arc(f.p[0], f.p[1], 4 + (1 - f.life) * 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        return true
      })

      if (pointer.active) {
        ctx.strokeStyle = 'rgba(31,69,245,0.5)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 22, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (now - lastSpawn > 420 && traces.length) {
        lastSpawn = now
        spawn(Math.floor(Math.random() * traces.length))
      }
      render(dt)
      raf = visible && !document.hidden && !pausedRef.current ? requestAnimationFrame(loop) : 0
    }

    const start = () => {
      if (reduce || raf || pausedRef.current) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    const local = (e) => {
      const r = canvas.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top, r]
    }

    const onMove = (e) => {
      if (reduce || pausedRef.current) return
      const [x, y, r] = local(e)
      pointer.active = x >= 0 && y >= 0 && x <= r.width && y <= r.height && e.pointerType === 'mouse'
      pointer.x = x
      pointer.y = y
      const now = performance.now()
      if (now - lastPointer > 90) {
        lastPointer = now
        const s = nearest(x, y, 70)
        if (s) spawn(s.ti, s.d)
      }
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onDown = (e) => {
      if (reduce || pausedRef.current) return
      if (e.target.closest && e.target.closest('a,button')) return
      const [x, y, r] = local(e)
      if (x < 0 || y < 0 || x > r.width || y > r.height) return
      const near = samples
        .filter((s) => Math.hypot(s.p[0] - x, s.p[1] - y) < 180)
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
      near.forEach((s) => spawn(s.ti, s.d))
      flashes.push({ p: [x, y], life: 1, color: '#1F45F5' })
    }

    startRef.current = start
    resize()
    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)
    const onVis = () => !document.hidden && visible && start()
    document.addEventListener('visibilitychange', onVis)
    const host = canvas.parentElement
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointerdown', onDown)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={className} />
}
