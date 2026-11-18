const experiences = [
  {
    title: 'Volunteer AI Software Developer',
    company: 'MatchingDonors (remote)',
    period: 'Nov 2026 - Present',
    current: true,
    bullets: [
      'Building an AI-assisted outreach tool in Python on existing LLM APIs: it ranks patient and donor registrations by urgency and drafts outreach for a human to review before anything is sent.',
      'Designing the review queue and recurring draft automation so staff keep final approval on every message.',
    ],
  },
  {
    title: 'Embedded Systems & Controls Engineer',
    company: 'UMass Mechatronics Team, ASME Student Design Competition',
    period: 'Jan 2025 - May 2026',
    bullets: [
      'Wrote C/C++ firmware for real-time motor control and sensor fusion on a custom autonomous robot.',
      'Integrated ultrasonic, vision and contact sensors over I2C, SPI and UART, and tuned PID loops for stability and response.',
      'Diagnosed hardware-software faults during board bring-up and field testing with the mechanical and electrical teams.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'WealthTech',
    period: 'Jun 2025 - Aug 2025',
    bullets: [
      'Built Python automation for regression and functional testing, and ran system-level validation with structured root-cause analysis on failures.',
      'Wrote SQL queries and documented system behavior and edge cases, working in Git and Agile sprints with JIRA.',
    ],
  },
  {
    title: 'Undergraduate Course Assistant',
    company: 'UMass Amherst ECE Department',
    period: 'Jan 2024 - Dec 2024',
    bullets: [
      'Mentored 80+ students in digital logic, RTL design and FPGA simulation.',
      'Taught structured debugging and hardware verification, and wrote clear explanations of hard hardware concepts.',
    ],
  },
  {
    title: 'Research Assistant',
    company: 'Elaine Marieb Center for Nursing and Engineering Innovation',
    period: 'Dec 2023 - Aug 2024',
    bullets: [
      'Supported a tetra-polar bioimpedance spectroscopy project with Python scripting, testing and data analysis.',
      'Automated validation workflows into repeatable test procedures that other teams could trace.',
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="on-dark bg-cobalt pb-24 pt-6 text-white sm:pb-32 sm:pt-10">
      <div className="wrap">
        <p className="kicker text-white/70">Experience</p>
        <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          Where I’ve worked
        </h2>

        <ol className="mt-14 divide-y-2 divide-white/20 border-y-2 border-white/20">
          {experiences.map((exp) => (
            <li key={exp.title} className="group grid gap-4 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
              <div>
                <p className="font-mono text-sm text-lime">{exp.period}</p>
                {exp.current && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-0.5 font-mono text-[11px] font-semibold text-ink">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2BB24C]" />
                    Now
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{exp.title}</h3>
                <p className="mt-1 text-white/75">{exp.company}</p>
                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-white/90">
                      <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
