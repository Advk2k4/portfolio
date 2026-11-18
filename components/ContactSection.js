const EMAIL = 'aadvikmishra7@gmail.com'

const OTHER = [
  { label: 'LinkedIn', value: 'linkedin.com/in/aadvikm', href: 'https://www.linkedin.com/in/aadvikm' },
  { label: 'GitHub', value: 'github.com/Advk2k4', href: 'https://github.com/Advk2k4' },
  { label: 'Résumé', value: 'Download the PDF', href: '/AadvikMishra_Resume.pdf' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="bg-signal py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker text-ink/70">Contact</p>
        <h2 className="mt-3 font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
          Let’s build
          <br />
          something.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-ink/85">
          I’m open to full-time roles and happy to talk about any of these projects. Email is the fastest way to
          reach me.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="group mt-10 inline-flex max-w-full items-center gap-3 rounded-full bg-ink py-4 pl-6 pr-5 text-paper shadow-[5px_5px_0_#141414] ring-2 ring-ink transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_rgba(20,20,20,0.55)] sm:pl-8"
        >
          <span className="break-all font-display text-xl font-bold sm:text-3xl">{EMAIL}</span>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border-2 border-ink bg-ink sm:grid-cols-3">
          {OTHER.map((l) => (
            <li key={l.label} className="bg-signal">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[96px] flex-col justify-center p-5 transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">{l.label}</span>
                <span className="mt-1 font-display text-lg font-bold sm:text-xl">
                  {l.value} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
