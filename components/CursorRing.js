import { useEffect, useRef, useState } from 'react'

// A ring that trails the mouse and grows with a short label over interactive things.
// Label comes from the nearest [data-cursor] ancestor, else "Open" for links. Mouse-only,
// skipped under reduced motion; the native cursor stays visible so nothing is hidden.

export default function CursorRing() {
  const ring = useRef(null)
  const [label, setLabel] = useState('')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let shown = false

    const tick = () => {
      rx += (x - rx) * 0.22
      ry += (y - ry) * 0.22
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!shown && ring.current) {
        shown = true
        ring.current.style.opacity = '1'
      }
      updateLabel(e.target)
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const updateLabel = (el) => {
      const t = el && el.closest ? el.closest('[data-cursor], a, button') : null
      setLabel(t ? t.getAttribute('data-cursor') ?? (t.tagName === 'A' ? 'Open' : '') : '')
    }
    // Scrolling moves content under a still pointer, so re-check what is under it.
    const onScroll = () => shown && updateLabel(document.elementFromPoint(x, y))
    const onLeave = () => {
      shown = false
      if (ring.current) ring.current.style.opacity = '0'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  if (!enabled) return null
  const big = Boolean(label)
  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] opacity-0 transition-opacity duration-200"
    >
      <div
        className={`flex items-center justify-center rounded-full border-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-[width,height,background-color,border-color] duration-200 ease-out ${
          big ? 'h-16 w-16 border-ink bg-lime text-ink' : 'h-7 w-7 border-ink/70 bg-transparent'
        }`}
      >
        {big ? label : ''}
      </div>
    </div>
  )
}
