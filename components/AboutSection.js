const STATS = [
  { value: '91%', label: 'accuracy of the sound classifier running on EchoSafe' },
  { value: '5', label: 'custom KiCad PCBs designed for EchoSafe' },
  { value: '2', label: 'hackathon wins, at HackUMass X and HackHer413' },
  { value: '80+', label: 'students mentored as an ECE course assistant' },
]

const FACTS = [
  { label: 'Degree', value: 'B.S. Computer Engineering, UMass Amherst, May 2026' },
  { label: 'Honors', value: 'Chancellor’s Award; Dean’s List, Fall 2024 to Fall 2025' },
  { label: 'Coursework', value: 'VLSI Design, Embedded Systems, Digital Systems, Computer Architecture, Signals & Systems' },
  { label: 'Now', value: 'Volunteer AI software developer at MatchingDonors' },
  { label: 'Looking for', value: 'Full-time roles in embedded, firmware, hardware, VLSI or software engineering' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-paper pb-8 pt-10 sm:pt-16">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="kicker text-muted">About</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Hi, I’m Aadvik.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                I graduated from UMass Amherst in May 2026 with a B.S. in Computer Engineering. I like the whole
                life of a device: picking the parts, laying out the board, bringing it up on the bench, writing
                the firmware, and training the model that runs on it. My favorite build so far is EchoSafe, an
                ear-worn wearable that tells deaf and hard-of-hearing people what a sound was and where it came
                from.
              </p>
              <p>
                Python and Java are my strongest languages, and I write C and C++ for microcontrollers. I have
                taken chips from RTL to layout in Cadence and Synopsys tools, built ML pipelines, and shipped web
                apps at hackathons, two of which won awards.
              </p>
              <p>
                Right now I’m volunteering as an AI software developer at MatchingDonors, building an outreach
                tool that keeps a human in charge of every message, and looking for my first full-time role.
                Embedded and hardware are home base, but I’m just as happy writing software.
              </p>
            </div>
          </div>

          <dl className="self-end rounded-[1.75rem] border-2 border-ink bg-paper">
            {FACTS.map((f, i) => (
              <div key={f.label} className={`grid gap-1 p-5 sm:grid-cols-[8rem_1fr] sm:gap-4 ${i ? 'border-t-2 border-ink' : ''}`}>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{f.label}</dt>
                <dd className="font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t-2 border-ink/10 pt-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value}>
              <dt className="font-display text-4xl font-extrabold tabular-nums sm:text-5xl">{s.value}</dt>
              <dd className="mt-2 max-w-[15rem] text-sm leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
