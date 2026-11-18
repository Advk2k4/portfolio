import { useState } from 'react'
import { skillGroups, ROLE_LABELS } from '../lib/skills'
import { projectTitle } from '../lib/projects'

function evidence(used) {
  return used.map((u) =>
    u.startsWith('role:')
      ? { key: u, label: ROLE_LABELS[u], href: '#experience' }
      : { key: u, label: projectTitle(u), href: u === 'echosafe' ? '#echosafe' : `#p-${u}` }
  )
}

export default function SkillsSection() {
  const [picked, setPicked] = useState({ group: 'Hardware & PCB', name: 'KiCad' })

  const pickedSkill = skillGroups
    .find((g) => g.name === picked.group)
    ?.skills.find((s) => s.name === picked.name)

  return (
    <section id="skills" className="bg-lime py-24 sm:py-32">
      <div className="wrap">
        <p className="kicker text-ink/70">Skills</p>
        <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
          The toolbox
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink/80">
          Tap a skill with a dot to see where I used it.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.name} className="rounded-3xl border-2 border-ink bg-paper p-5">
                <h3 className="font-display text-xl font-bold">{g.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => {
                    const has = s.used.length > 0
                    const on = picked.group === g.name && picked.name === s.name
                    return (
                      <li key={s.name}>
                        {has ? (
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => setPicked({ group: g.name, name: s.name })}
                            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full border-2 border-ink px-3 text-sm font-medium transition-[transform,background-color,color] duration-150 hover:-translate-y-0.5 ${
                              on ? 'bg-ink text-paper' : 'bg-paper hover:bg-cream'
                            }`}
                          >
                            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-lime' : 'bg-signal'}`} />
                            {s.name}
                          </button>
                        ) : (
                          <span className="inline-flex min-h-[44px] items-center rounded-full border-2 border-ink/25 px-3 text-sm text-ink/80">
                            {s.name}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
            <div className="rounded-3xl border-2 border-ink bg-ink p-6 text-paper shadow-[6px_6px_0_#FF5B23] on-dark">
              <p className="kicker text-lime">Where I used it</p>
              <p className="mt-3 font-display text-3xl font-extrabold">{picked.name}</p>
              <ul className="mt-5 space-y-1">
                {pickedSkill &&
                  evidence(pickedSkill.used).map((e) => (
                    <li key={e.key}>
                      <a href={e.href} className="group flex min-h-[44px] items-center justify-between gap-3 border-b border-white/15 text-paper/90 hover:text-lime">
                        <span>{e.label}</span>
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
