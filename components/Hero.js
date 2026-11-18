import { useState } from 'react'
import Image from 'next/image'
import SignalCanvas from './SignalCanvas'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Advk2k4', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aadvikm', external: true },
  { label: 'Email', href: 'mailto:aadvikmishra7@gmail.com' },
]

function BouncyName({ text }) {
  return (
    <span aria-hidden="true" className="block">
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-[transform,color] duration-200 ease-out hover:-translate-y-[0.08em] hover:text-signal"
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [paused, setPaused] = useState(false)
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-24">
      {/* Traces stay clear of the text: on phones they live in the lower part, on wider screens on the right. */}
      <SignalCanvas
        paused={paused}
        className="absolute inset-0 -z-20 h-full w-full [mask-image:linear-gradient(180deg,transparent_45%,#000_80%)] md:[mask-image:linear-gradient(90deg,transparent_34%,rgba(0,0,0,0.6)_52%,#000_70%)]"
      />
      {/* Soft fade at the bottom so the hero melts into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-paper" />

      <div className="wrap grid flex-1 items-center gap-12 pb-16 pt-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
        <div>
          <p className="enter chip mb-7 border-ink bg-paper" style={{ '--d': '0ms' }}>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2BB24C]" aria-hidden="true" />
            Open to full-time roles
          </p>

          <h1
            aria-label="Aadvik Mishra"
            translate="no"
            className="enter font-display text-[clamp(4rem,19vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.04em] md:text-[clamp(4rem,10vw,8.5rem)]"
            style={{ '--d': '80ms' }}
          >
            <BouncyName text="Aadvik" />
            <BouncyName text="Mishra" />
          </h1>

          <p className="enter mt-6 max-w-md text-xl leading-snug text-ink sm:text-2xl" style={{ '--d': '160ms' }}>
            Computer engineer. I build the hardware, the firmware, and the software around it.
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '240ms' }}>
            <a href="#echosafe" className="btn btn-solid">
              See my work
              <span aria-hidden="true">↓</span>
            </a>
            <a href="/AadvikMishra_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline bg-paper">
              Download résumé
            </a>
          </div>

          <ul className="enter mt-5 flex flex-wrap gap-2" style={{ '--d': '300ms' }} aria-label="Find me online">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-4 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
                >
                  {l.label}
                  {l.external && <span aria-hidden="true">↗</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="enter relative mx-auto w-[min(72vw,320px)]" style={{ '--d': '200ms' }}>
          <div className="sticker relative aspect-square">
            <svg viewBox="0 0 200 200" className="ring-spin absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <path id="ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
              </defs>
              <circle cx="100" cy="100" r="99" fill="#D5F542" stroke="#141414" strokeWidth="2" />
              <text className="font-mono" fontSize="10.5" letterSpacing="2.4" fill="#141414">
                <textPath href="#ring">EMBEDDED · FIRMWARE · HARDWARE · VLSI · MACHINE LEARNING · SOFTWARE ·</textPath>
              </text>
            </svg>
            <div className="absolute inset-[13%] overflow-hidden rounded-full border-2 border-ink bg-cream">
              <Image
                src="/Aadvik.jpeg"
                alt="Portrait of Aadvik Mishra"
                fill
                priority
                sizes="(max-width: 768px) 60vw, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? 'Play background animation' : 'Pause background animation'}
        title={paused ? 'Play background animation' : 'Pause background animation'}
        className="absolute bottom-5 right-4 hidden h-11 w-11 items-center justify-center rounded-full text-ink/45 transition-colors hover:bg-cream hover:text-ink motion-safe:flex sm:right-6"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          {paused ? <path d="M3 1.5v11l9-5.5z" fill="currentColor" /> : <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" fill="currentColor" />}
        </svg>
      </button>
    </section>
  )
}
