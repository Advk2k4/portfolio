// Drawn visuals for every project card. Deterministic (no Math.random) so server and
// client render the same markup. Each one comes alive when its card is hovered.

export function Spectrum() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const base = 10 + 8 * Math.abs(Math.sin(i * 1.7)) + 6 * Math.abs(Math.sin(i * 0.37))
    const peak = 70 * Math.exp(-((i - 30) ** 2) / 3)
    return Math.min(92, base + peak)
  })
  return (
    <div className="relative h-full w-full bg-ink p-5">
      <svg viewBox="0 0 480 200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        {bars.map((h, i) => (
          <rect key={i} x={i * 10 + 1} y={200 - h * 2} width="7" height={h * 2} rx="2" fill={i === 30 ? '#FF5B23' : 'rgba(245,241,232,0.28)'} />
        ))}
        <g className="transition-transform duration-700 ease-out group-hover:-translate-x-[110px]">
          <line x1="305" x2="305" y1="0" y2="200" stroke="#D5F542" strokeWidth="2" strokeDasharray="5 5" />
        </g>
      </svg>
      <p className="absolute right-5 top-4 font-mono text-[11px] text-paper/70">speed line 56.5 Hz</p>
      <p className="absolute right-5 top-9 font-mono text-[11px] text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        brake → FAULT
      </p>
    </div>
  )
}

export function Mesh() {
  const nodes = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) nodes.push([90 + c * 150, 40 + r * 60])
  return (
    <div className="relative h-full w-full bg-cobalt p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        {nodes.map(([x, y], i) => (
          <g key={i}>
            {i % 3 < 2 && <line x1={x} y1={y} x2={x + 150} y2={y} stroke="rgba(255,255,255,0.45)" strokeWidth="2" />}
            {i < 6 && <line x1={x} y1={y} x2={x} y2={y + 60} stroke="rgba(255,255,255,0.45)" strokeWidth="2" />}
          </g>
        ))}
        {nodes.map(([x, y], i) => (
          <rect key={`n${i}`} x={x - 14} y={y - 14} width="28" height="28" rx="6" fill="#141414" stroke="#F5F1E8" strokeWidth="2" />
        ))}
        <circle r="6" fill="#D5F542" className="packet packet-a" cx="90" cy="40" />
        <circle r="6" fill="#FF5B23" className="packet packet-b" cx="390" cy="160" />
      </svg>
    </div>
  )
}

export function Eeg() {
  const rows = 5
  const paths = Array.from({ length: rows }, (_, r) => {
    let d = ''
    for (let x = 0; x <= 480; x += 6) {
      const y =
        30 + r * 34 + 6 * Math.sin(x * 0.09 + r) + 4 * Math.sin(x * 0.23 + r * 2.1) + 2 * Math.sin(x * 0.61 + r)
      d += `${x === 0 ? 'M' : 'L'}${x},${y.toFixed(1)} `
    }
    return d
  })
  return (
    <div className="relative h-full w-full bg-lime p-5">
      <svg viewBox="0 0 480 200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#141414" strokeWidth="1.6" opacity={0.75} />
        ))}
        <g className="origin-[312px_98px] scale-y-[0.35] transition-transform duration-300 ease-out group-hover:scale-y-100">
          <path d="M306,98 L312,60 L318,130 L324,98" fill="none" stroke="#FF5B23" strokeWidth="3" strokeLinejoin="round" />
        </g>
      </svg>
      <p className="absolute right-5 top-4 font-mono text-[11px] text-ink/70">2 of 1,001 samples</p>
    </div>
  )
}

export function Layout() {
  // Stylised standard-cell layout: diffusion, poly gates, metal straps and contacts.
  const cells = [0, 1, 2, 3]
  return (
    <div className="relative h-full w-full bg-[#F1EEE6] p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="14" width="460" height="16" fill="#1F45F5" opacity="0.85" />
        <rect x="10" y="170" width="460" height="16" fill="#1F45F5" opacity="0.85" />
        {cells.map((c) => (
          <g key={c} transform={`translate(${20 + c * 115} 0)`}>
            <rect x="0" y="44" width="95" height="38" fill="#2BB24C" opacity="0.55" />
            <rect x="0" y="118" width="95" height="38" fill="#D5F542" opacity="0.9" />
            {[20, 45, 70].map((x) => (
              <rect key={x} x={x} y="36" width="7" height="128" fill="#FF5B23" opacity="0.85" />
            ))}
            {[8, 33, 58, 83].map((x) => (
              <g key={x}>
                <rect x={x} y="56" width="6" height="6" fill="#141414" />
                <rect x={x} y="132" width="6" height="6" fill="#141414" />
              </g>
            ))}
            <rect x="6" y="94" width="85" height="10" fill="#1F45F5" opacity="0.55" className="transition-opacity duration-300 group-hover:opacity-100" />
          </g>
        ))}
      </svg>
      <p className="absolute right-5 top-4 rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        DRC ✓ LVS ✓
      </p>
    </div>
  )
}

export function Code() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-ink p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
      <div className="w-full max-w-[22rem] rounded-xl border border-white/15 bg-white/[0.04] p-4">
        <p className="text-white/40">// Unit 4 · Pointers</p>
        <p>
          <span className="text-signal">int</span> <span className="text-paper">x = </span>
          <span className="text-lime">42</span>
          <span className="text-paper">;</span>
        </p>
        <p>
          <span className="text-signal">int</span> <span className="text-paper">*p = &amp;x;</span>
        </p>
        <p className="text-paper">
          printf(<span className="text-lime">"%d"</span>, *p);
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-lime opacity-0 group-hover:opacity-100" />
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
          <span className="text-white/60">53 lessons · 11 units</span>
          <span className="rounded-full bg-signal px-2 py-0.5 text-ink transition-transform duration-300 group-hover:scale-110">🔥 streak</span>
        </div>
      </div>
    </div>
  )
}

// ---- Software & apps ----

export function Route() {
  // Farewise: transport options priced side by side, with the chosen route on a map.
  const modes = [
    { m: 'Metro', t: '31 min', c: '≈ ₹30', tag: 'Cheapest' },
    { m: 'Auto', t: '24 min', c: '≈ ₹180' },
    { m: 'Cab', t: '22 min', c: '≈ ₹260', tag: 'Fastest' },
  ]
  return (
    <div className="relative grid h-full w-full grid-cols-[1fr_1.1fr] gap-3 bg-[#EDE7DA] p-4 pt-14">
      <ul className="flex flex-col justify-center gap-2">
        {modes.map((o, i) => (
          <li
            key={o.m}
            className={`flex items-center justify-between rounded-xl border-2 px-3 py-2 text-[12px] transition-colors duration-300 ${
              i === 0 ? 'border-ink bg-paper group-hover:bg-lime' : 'border-ink/15 bg-paper/70'
            }`}
          >
            <span className="font-semibold">{o.m}</span>
            <span className="font-mono text-ink/70">
              {o.t} · {o.c}
            </span>
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 240 180" className="h-full w-full rounded-xl bg-paper" aria-hidden="true">
        {[30, 70, 110, 150].map((y) => (
          <line key={y} x1="0" x2="240" y1={y} y2={y + 8} stroke="#E3DCCD" strokeWidth="6" />
        ))}
        {[40, 100, 160, 210].map((x) => (
          <line key={x} x1={x} x2={x - 12} y1="0" y2="180" stroke="#E3DCCD" strokeWidth="6" />
        ))}
        <path d="M60 30 C 80 70, 70 100, 120 110 S 170 150, 190 155" fill="none" stroke="#1F45F5" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M60 30 C 80 70, 70 100, 120 110 S 170 150, 190 155"
          fill="none"
          stroke="#D5F542"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset="300"
          className="transition-[stroke-dashoffset] duration-1000 ease-out group-hover:[stroke-dashoffset:0]"
        />
        <circle cx="60" cy="30" r="7" fill="#141414" />
        <rect x="183" y="148" width="14" height="14" fill="#141414" />
      </svg>
    </div>
  )
}

export function Queue() {
  // Medway: a live clinic queue.
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#DDE6FF] p-5 pt-12">
      <div className="w-full max-w-[18rem] rounded-2xl border-2 border-ink bg-paper p-4 shadow-[4px_4px_0_#1F45F5]">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Now serving</p>
        <p className="font-display text-3xl font-extrabold">A12</p>
        <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
          {['A12', 'A13', 'A14', 'A15'].map((n, i) => (
            <span
              key={n}
              className={`flex h-8 flex-1 items-center justify-center rounded-lg font-mono text-[11px] transition-colors duration-300 ${
                i === 3 ? 'bg-signal font-semibold text-ink' : i === 0 ? 'bg-ink text-paper' : 'bg-cream group-hover:bg-lime'
              }`}
            >
              {n}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-ink/75">
          You are <b>A15</b> · about 3 ahead of you
        </p>
      </div>
    </div>
  )
}

export function Food() {
  // FoodScout: filters and nearby results.
  const rows = [
    { n: 'Noodle bar', s: 4.6, d: '0.4 km' },
    { n: 'Taqueria', s: 4.4, d: '0.9 km' },
    { n: 'Dosa house', s: 4.7, d: '1.6 km' },
  ]
  return (
    <div className="relative h-full w-full bg-signal p-5 pt-14">
      <div className="flex flex-wrap gap-1.5">
        {['Any cuisine', '★ 4+', '< 2 km'].map((f) => (
          <span key={f} className="rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 font-mono text-[11px]">
            {f}
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r, i) => (
          <li
            key={r.n}
            className="flex items-center justify-between rounded-xl bg-paper px-3 py-2 text-[12px] transition-transform duration-300 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="font-semibold">{r.n}</span>
            <span className="font-mono text-ink/70">
              ★ {r.s} · {r.d}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Pins() {
  // UPlay!: nearby places on a map around you.
  const pins = [
    [110, 70],
    [330, 60],
    [380, 140],
    [160, 150],
  ]
  return (
    <div className="relative h-full w-full bg-[#FFE1D3] p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <path d="M0 120 C 120 90, 200 160, 300 110 S 440 80, 480 100" fill="none" stroke="#fff" strokeWidth="14" />
        <path d="M230 0 L 250 200" stroke="#fff" strokeWidth="10" />
        {[30, 55, 80].map((r) => (
          <circle key={r} cx="240" cy="105" r={r} fill="none" stroke="#FF5B23" strokeOpacity="0.35" strokeWidth="2" className="origin-[240px_105px] transition-transform duration-700 group-hover:scale-125" />
        ))}
        <circle cx="240" cy="105" r="9" fill="#1F45F5" stroke="#fff" strokeWidth="3" />
        {pins.map(([x, y], i) => (
          <g key={i} className="transition-transform duration-300 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
            <path d={`M${x} ${y} c -10 -12 -14 -18 -14 -24 a 14 14 0 1 1 28 0 c 0 6 -4 12 -14 24 z`} fill="#141414" />
            <circle cx={x} cy={y - 24} r="5" fill="#D5F542" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function Walk() {
  // SafeStride: two students paired for a walk across campus.
  return (
    <div className="relative h-full w-full bg-night p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <rect x="60" y="30" width="90" height="50" rx="8" fill="#1F45F5" />
        <rect x="300" y="110" width="110" height="60" rx="8" fill="#FF5B23" />
        <text x="105" y="60" textAnchor="middle" className="font-mono" fontSize="13" fill="#F5F1E8">ILC</text>
        <text x="355" y="145" textAnchor="middle" className="font-mono" fontSize="13" fill="#141414">ISB</text>
        <path d="M150 55 H 300 V 125" fill="none" stroke="rgba(245,241,232,0.35)" strokeWidth="3" strokeDasharray="6 8" />
        <circle cx="150" cy="51" r="7" fill="#D5F542" className="walker walker-a" />
        <circle cx="160" cy="59" r="7" fill="#F5F1E8" className="walker walker-b" />
        <g transform="translate(420 22)">
          <path d="M18 2 L32 8 V20 C32 30 25 36 18 39 C11 36 4 30 4 20 V8 Z" fill="#D5F542" />
          <path d="M11 20 l5 5 l9 -10" fill="none" stroke="#141414" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}

// ---- Hardware ----

export function Thermo() {
  // TinyTemp: OLED reading on a small green board, LED lights on hover.
  return (
    <div className="relative h-full w-full bg-[#0D3B2E] p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        {[40, 70, 130, 160].map((y, i) => (
          <path key={y} d={`M0 ${y} H 70 L 90 ${y + (i % 2 ? 10 : -10)} H 120`} fill="none" stroke="#2E7D5B" strokeWidth="3" />
        ))}
        <rect x="120" y="30" width="230" height="140" rx="10" fill="#050807" stroke="#2E7D5B" strokeWidth="3" />
        <text x="235" y="118" textAnchor="middle" className="font-display" fontWeight="800" fontSize="56" fill="#9EF0FF">29.5°C</text>
        <rect x="300" y="45" width="34" height="16" rx="3" fill="none" stroke="#9EF0FF" strokeWidth="2" />
        <rect x="303" y="48" width="22" height="10" fill="#9EF0FF" />
        <rect x="385" y="70" width="50" height="60" rx="6" fill="#1A1A1A" />
        <text x="410" y="105" textAnchor="middle" className="font-mono" fontSize="11" fill="#9CA3AF">t85</text>
        <circle cx="410" cy="160" r="9" fill="#5B1A10" className="transition-[fill] duration-300 group-hover:fill-[#FF5B23]" />
      </svg>
    </div>
  )
}

export function Digit() {
  // FPGA digit recognition: an 8x8 handwritten 7 and the network's scores.
  const seven = ['00000000', '01111110', '00000110', '00001100', '00011000', '00110000', '00110000', '00000000']
  const scores = [0.05, 0.08, 0.1, 0.06, 0.04, 0.07, 0.05, 0.92, 0.12, 0.09]
  return (
    <div className="relative h-full w-full bg-ink p-5 pt-12">
      <svg viewBox="0 0 480 170" className="h-full w-full" aria-hidden="true">
        {seven.map((row, r) =>
          row.split('').map((v, c) => (
            <rect key={`${r}-${c}`} x={30 + c * 18} y={10 + r * 18} width="16" height="16" rx="2" fill={v === '1' ? '#D5F542' : 'rgba(245,241,232,0.08)'} />
          ))
        )}
        <path d="M200 82 H 240 M 232 74 L 240 82 L 232 90" stroke="rgba(245,241,232,0.5)" strokeWidth="3" fill="none" />
        {scores.map((s, i) => (
          <g key={i}>
            <rect
              x={262 + i * 20}
              y={150 - s * 130}
              width="14"
              height={s * 130}
              rx="3"
              fill={i === 7 ? '#FF5B23' : 'rgba(245,241,232,0.3)'}
              className={i === 7 ? 'origin-bottom transition-transform duration-500 [transform-box:fill-box] scale-y-75 group-hover:scale-y-100' : ''}
            />
            <text x={269 + i * 20} y="166" textAnchor="middle" className="font-mono" fontSize="10" fill="rgba(245,241,232,0.6)">
              {i}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export function Ecg() {
  // Heart rate monitor: a pulse trace and a beating heart.
  let d = 'M0 110'
  for (let k = 0; k < 4; k++) {
    const o = k * 120
    d += ` L${o + 40} 110 L${o + 52} 98 L${o + 60} 110 L${o + 70} 110 L${o + 78} 40 L${o + 88} 150 L${o + 96} 110 L${o + 120} 110`
  }
  return (
    <div className="relative h-full w-full bg-night p-5">
      <svg viewBox="0 0 480 200" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        {[50, 100, 150].map((y) => (
          <line key={y} x1="0" x2="480" y1={y} y2={y} stroke="rgba(255,91,35,0.12)" />
        ))}
        <path d={d} fill="none" stroke="#FF5B23" strokeWidth="3" strokeLinejoin="round" className="ecg-line" />
      </svg>
      <p className="absolute right-5 top-4 flex items-center gap-2 font-mono text-sm text-lime">
        <span className="beat inline-block text-signal">♥</span> BPM
      </p>
    </div>
  )
}

// ---- ML ----

export function Hand() {
  // Sign language recognition: hand landmarks forming an "L".
  const pts = {
    w: [210, 170],
    t1: [180, 150], t2: [160, 130], t3: [140, 118], t4: [120, 108],
    i1: [200, 120], i2: [200, 90], i3: [200, 64], i4: [200, 40],
    m1: [222, 122], m2: [232, 108], m3: [234, 128], m4: [230, 140],
    r1: [240, 128], r2: [250, 116], r3: [251, 134], r4: [246, 146],
    p1: [254, 138], p2: [264, 128], p3: [265, 144], p4: [260, 154],
  }
  const chains = [
    ['w', 't1', 't2', 't3', 't4'],
    ['w', 'i1', 'i2', 'i3', 'i4'],
    ['w', 'm1', 'm2', 'm3', 'm4'],
    ['w', 'r1', 'r2', 'r3', 'r4'],
    ['w', 'p1', 'p2', 'p3', 'p4'],
    ['i1', 'm1', 'r1', 'p1'],
  ]
  return (
    <div className="relative h-full w-full bg-[#F1EEE6] p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <rect x="100" y="20" width="190" height="170" rx="12" fill="none" stroke="#1F45F5" strokeWidth="2" strokeDasharray="6 6" />
        {chains.map((c, i) => (
          <polyline key={i} points={c.map((k) => pts[k].join(',')).join(' ')} fill="none" stroke="#141414" strokeWidth="3" strokeLinejoin="round" />
        ))}
        {Object.entries(pts).map(([k, [x, y]]) => (
          <circle key={k} cx={x} cy={y} r="5" fill="#D5F542" stroke="#141414" strokeWidth="2" />
        ))}
        <g className="origin-[380px_105px] transition-transform duration-300 group-hover:scale-110">
          <rect x="335" y="60" width="90" height="90" rx="18" fill="#141414" />
          <text x="380" y="128" textAnchor="middle" className="font-display" fontWeight="800" fontSize="58" fill="#D5F542">L</text>
        </g>
      </svg>
    </div>
  )
}

export function Mood() {
  // Sentiment analyzer: a face, a message, and a sentiment needle.
  return (
    <div className="relative h-full w-full bg-[#FFF3C4] p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <circle cx="120" cy="105" r="70" fill="#D5F542" stroke="#141414" strokeWidth="3" />
        <circle cx="96" cy="88" r="7" fill="#141414" />
        <circle cx="144" cy="88" r="7" fill="#141414" />
        <path d="M88 122 Q120 150 152 122" fill="none" stroke="#141414" strokeWidth="5" strokeLinecap="round" />
        <rect x="230" y="40" width="200" height="50" rx="16" fill="#141414" />
        <text x="330" y="71" textAnchor="middle" className="font-sans" fontSize="17" fill="#F5F1E8">“this made my day”</text>
        <path d="M260 170 A 70 70 0 0 1 400 170" fill="none" stroke="#141414" strokeOpacity="0.15" strokeWidth="14" strokeLinecap="round" />
        <path d="M260 170 A 70 70 0 0 1 400 170" fill="none" stroke="url(#mood)" strokeWidth="14" strokeLinecap="round" />
        <defs>
          <linearGradient id="mood" x1="0" x2="1">
            <stop offset="0" stopColor="#FF5B23" />
            <stop offset="1" stopColor="#2BB24C" />
          </linearGradient>
        </defs>
        <g className="origin-[330px_170px] rotate-[20deg] transition-transform duration-500 ease-out group-hover:rotate-[55deg]">
          <line x1="330" y1="170" x2="330" y2="115" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
        </g>
        <circle cx="330" cy="170" r="7" fill="#141414" />
      </svg>
    </div>
  )
}

export function Bias() {
  // Hiring bias audit: identical résumés, different names, an uneven scale.
  return (
    <div className="relative h-full w-full bg-cobalt p-5">
      <svg viewBox="0 0 480 200" className="h-full w-full" aria-hidden="true">
        <line x1="240" y1="40" x2="240" y2="185" stroke="#F5F1E8" strokeWidth="4" />
        <rect x="200" y="182" width="80" height="8" rx="4" fill="#F5F1E8" />
        <g className="origin-[240px_40px] rotate-[-7deg] transition-transform duration-500 ease-out group-hover:rotate-[-13deg]">
          <line x1="110" y1="40" x2="370" y2="40" stroke="#F5F1E8" strokeWidth="4" strokeLinecap="round" />
          {[110, 370].map((x, i) => (
            <g key={x}>
              <line x1={x} y1="40" x2={x} y2="80" stroke="#F5F1E8" strokeWidth="2" />
              <rect x={x - 42} y="80" width="84" height="96" rx="8" fill="#F5F1E8" />
              <rect x={x - 30} y="92" width="40" height="8" rx="2" fill={i ? '#FF5B23' : '#D5F542'} />
              {[110, 124, 138, 152].map((y) => (
                <rect key={y} x={x - 30} y={y} width={y === 152 ? 36 : 60} height="5" rx="2" fill="#141414" opacity="0.25" />
              ))}
            </g>
          ))}
        </g>
      </svg>
      <p className="absolute right-5 top-4 font-mono text-[11px] text-paper/80">same résumé · different name</p>
    </div>
  )
}

export const VISUALS = {
  spectrum: Spectrum,
  mesh: Mesh,
  eeg: Eeg,
  layout: Layout,
  code: Code,
  route: Route,
  queue: Queue,
  food: Food,
  pins: Pins,
  walk: Walk,
  thermo: Thermo,
  digit: Digit,
  ecg: Ecg,
  hand: Hand,
  mood: Mood,
  bias: Bias,
}
