import { useState } from 'react'

const EMAIL = 'aadvikmishra7@gmail.com'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <>
      <section id="contact" className="bg-signal py-24 sm:py-32">
        <div className="wrap">
          <p className="kicker text-ink/70">Contact</p>
          <h2 className="mt-3 font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
            Let’s build
            <br />
            something.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink/85">
            I’m open to full-time roles and happy to talk about any of these projects. Email is the fastest
            way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${EMAIL}`} className="btn btn-solid text-base">
              Email me
            </a>
            <button type="button" onClick={copy} className="btn btn-outline text-base">
              {copied ? 'Copied ✓' : 'Copy email address'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border-2 border-ink bg-ink sm:grid-cols-3">
            {[
              { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
              { label: 'LinkedIn', value: 'linkedin.com/in/aadvikm', href: 'https://www.linkedin.com/in/aadvikm' },
              { label: 'GitHub', value: 'github.com/Advk2k4', href: 'https://github.com/Advk2k4' },
            ].map((l) => (
              <li key={l.label} className="bg-signal">
                <a
                  href={l.href}
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-[96px] flex-col justify-center p-5 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">{l.label}</span>
                  <span className="mt-1 break-all font-display text-lg font-bold sm:text-xl">
                    {l.value} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="on-dark bg-ink py-8 text-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-paper/60">
          <p>© 2026 Aadvik Mishra · aadvik.vercel.app</p>
          <a href="#home" className="inline-flex min-h-[44px] items-center hover:text-lime">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  )
}
