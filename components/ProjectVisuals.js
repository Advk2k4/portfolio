// Drawn visuals for projects without a photo. Deterministic (no Math.random) so server and
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

export const VISUALS = { spectrum: Spectrum, mesh: Mesh, eeg: Eeg, layout: Layout, code: Code }
