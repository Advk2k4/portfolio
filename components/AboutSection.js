const FACTS = [
  { label: 'Degree', value: 'B.S. Computer Engineering, UMass Amherst, May 2026' },
  { label: 'GPA', value: '3.6' },
  { label: 'Honors', value: 'Chancellor’s Award, Dean’s List' },
  { label: 'Coursework', value: 'VLSI Design, Embedded Systems, Digital Systems, Computer Architecture, Signals & Systems' },
  { label: 'Looking for', value: 'Full-time roles in embedded, firmware, hardware, VLSI or software engineering' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-paper py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <p className="kicker text-muted">About</p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            Hi, I’m Aadvik.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
            <p>
              I graduated from UMass Amherst in May 2026 with a B.S. in Computer Engineering. I like the
              whole stack of a device: picking the parts, laying out the board, bringing it up on the bench,
              writing the firmware, and training the model that runs on it.
            </p>
            <p>
              Python and Java are my strongest languages, and I write C and C++ for microcontrollers. I have
              taken chips from RTL to layout in Cadence and Synopsys tools, built ML pipelines, and shipped
              web apps at hackathons, two of which won awards.
            </p>
            <p>
              Right now I’m looking for my first full-time role. Embedded and hardware are home base, but I’m
              just as happy writing software, so if you’re building something interesting, I’d like to hear
              about it.
            </p>
          </div>
        </div>

        <dl className="self-end rounded-[1.75rem] border-2 border-ink">
          {FACTS.map((f, i) => (
            <div key={f.label} className={`grid gap-1 p-5 sm:grid-cols-[8rem_1fr] sm:gap-4 ${i ? 'border-t-2 border-ink' : ''}`}>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{f.label}</dt>
              <dd className="font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
