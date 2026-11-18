import { useEffect, useState } from 'react'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'echosafe', label: 'EchoSafe' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = ['home', ...NAV.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-wrap items-center justify-between rounded-full border-2 border-ink px-2 py-1.5 pl-4 transition-colors duration-300 ${
          scrolled ? 'bg-paper/90 backdrop-blur-md' : 'bg-paper'
        }`}
      >
        <a href="#home" className="font-display text-lg font-extrabold tracking-tight" aria-label="Aadvik Mishra, back to top">
          aadvik<span className="text-signal">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  active === n.id ? 'bg-ink text-paper' : 'hover:bg-cream'
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/AadvikMishra_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-[40px] items-center rounded-full bg-signal px-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Résumé
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-0 -z-10 flex flex-col overscroll-contain bg-ink px-6 pb-10 pt-24 text-paper md:hidden on-dark">
          <ul className="flex flex-col gap-1">
            {NAV.map((n, i) => (
              <li key={n.id} className="enter" style={{ '--d': `${i * 40}ms` }}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center font-display text-4xl font-bold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/AadvikMishra_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-auto bg-signal text-ink"
          >
            Download résumé
          </a>
        </div>
      )}
    </header>
  )
}
