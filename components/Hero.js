import { useState } from 'react'
import Image from 'next/image'
import SignalCanvas from './SignalCanvas'

const STATS = [
  { value: '91%', label: 'accuracy of the sound classifier running on EchoSafe' },
  { value: '5', label: 'custom KiCad PCBs designed for EchoSafe' },
  { value: '2', label: 'hackathon wins, at HackUMass X and HackHer413' },
  { value: '80+', label: 'students mentored as an ECE course assistant' },
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
    <section
      id="home"
      data-cursor="Click"
      className="relative isolate mx-2 mt-2 flex min-h-[calc(100svh-0.5rem)] flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper pt-20 sm:mx-3 sm:mt-3 sm:min-h-[calc(100svh-0.75rem)] sm:rounded-[2.25rem]"
    >
      <SignalCanvas paused={paused} className="absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(100deg,rgba(0,0,0,0.35)_10%,#000_60%)]" />

      <div className="wrap grid flex-1 items-center gap-10 py-8 md:grid-cols-[1.45fr_1fr] md:gap-8">
        <div>
          <p className="enter chip mb-6 border-ink bg-paper" style={{ '--d': '0ms' }}>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2BB24C]" aria-hidden="true" />
            Open to full-time roles · Graduated May 2026
          </p>

          <h1
            aria-label="Aadvik Mishra"
            translate="no"
            className="enter font-display text-[clamp(4rem,19vw,8.25rem)] md:text-[clamp(4rem,10vw,8.25rem)] font-extrabold leading-[0.86] tracking-[-0.04em]"
            style={{ '--d': '80ms' }}
          >
            <BouncyName text="Aadvik" />
            <BouncyName text="Mishra" />
          </h1>

          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl" style={{ '--d': '160ms' }}>
            Computer engineer from UMass Amherst. I design PCBs, write the firmware that runs on them, and
            train the models that make them useful. My favorite build so far is an ear-worn device that tells
            deaf users what a sound was and where it came from.
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={{ '--d': '240ms' }}>
            <a href="#echosafe" className="btn btn-solid">
              See EchoSafe
              <span aria-hidden="true">↓</span>
            </a>
            <a href="/AadvikMishra_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Download résumé
            </a>
          </div>

          <ul className="enter mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm" style={{ '--d': '300ms' }}>
            <li>
              <a className="link-draw inline-flex min-h-[44px] items-center" href="https://github.com/Advk2k4" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a className="link-draw inline-flex min-h-[44px] items-center" href="https://www.linkedin.com/in/aadvikm" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a className="link-draw inline-flex min-h-[44px] items-center" href="mailto:aadvikmishra7@gmail.com">
                aadvikmishra7@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="enter relative mx-auto w-[min(78vw,330px)]" style={{ '--d': '200ms' }}>
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
                sizes="(max-width: 768px) 60vw, 280px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="absolute -bottom-2 -left-2 rounded-full border-2 border-ink bg-signal px-4 py-2 font-mono text-xs font-semibold sm:-left-6">
            B.S. Computer Engineering ’26
          </p>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-paper/80 backdrop-blur-sm" data-cursor="">
        <dl className="wrap grid grid-cols-2 gap-y-5 py-5 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value} className="pr-4">
              <dt className="font-display text-3xl font-extrabold tabular-nums sm:text-4xl">{s.value}</dt>
              <dd className="mt-1 max-w-[15rem] text-sm leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="absolute right-4 top-[4.6rem] hidden items-center gap-3 font-mono text-xs text-muted motion-safe:flex lg:top-20">
        <span className="hidden lg:inline">move over the traces · click to send a signal</span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-[36px] items-center rounded-full border border-ink/30 bg-paper px-3 text-ink hover:border-ink"
        >
          {paused ? 'Play' : 'Pause'} animation
        </button>
      </div>
    </section>
  )
}
