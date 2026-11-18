import { useEffect, useRef } from 'react'

// Replaces the system cursor with one small circle (never both). It follows the pointer
// exactly, grows over things you can click, squeezes on press, and switches to a light
// outline over dark sections. Mouse-only; under reduced motion the normal cursor stays.

const INTERACTIVE = 'a, button, [role="button"], label, summary, svg[role="img"]'

export default function Cursor() {
  const dot = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = dot.current
    if (!fine || reduce || !el) return

    const root = document.documentElement
    root.classList.add('custom-cursor')
    let x = 0
    let y = 0
    let raf = 0

    const paint = () => {
      raf = 0
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      el.dataset.visible = 'true'
      const t = e.target
      el.dataset.hover = t.closest && t.closest(INTERACTIVE) ? 'true' : 'false'
      el.dataset.dark = t.closest && t.closest('.on-dark') ? 'true' : 'false'
      if (!raf) raf = requestAnimationFrame(paint)
    }
    const onDown = () => (el.dataset.down = 'true')
    const onUp = () => (el.dataset.down = 'false')
    const onLeave = () => (el.dataset.visible = 'false')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={dot} aria-hidden="true" className="cursor-dot" data-visible="false">
      <span />
    </div>
  )
}
