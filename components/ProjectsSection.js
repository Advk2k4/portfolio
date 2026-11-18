import { useEffect, useState } from 'react'
import Image from 'next/image'
import { CATEGORIES, CATEGORY_STYLE, projects } from '../lib/projects'
import { VISUALS } from './ProjectVisuals'

function ProjectCard({ project, big }) {
  const cat = CATEGORY_STYLE[project.category]
  const Visual = VISUALS[project.visual]
  return (
    <article
      id={`p-${project.id}`}
      className={`group flex scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#141414] target:shadow-[6px_6px_0_#FF5B23] ${
        big ? 'lg:col-span-3' : 'lg:col-span-2'
      }`}
    >
      <div className={`relative overflow-hidden border-b-2 border-ink ${big ? 'aspect-[16/9]' : 'aspect-[16/10]'} ${project.contain ? 'bg-cream' : 'bg-ink'}`}>
        {Visual ? (
          <Visual />
        ) : (
          <Image
            src={project.visual}
            alt={`${project.title} screenshot`}
            fill
            sizes={big ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${project.contain ? 'object-contain p-10' : 'object-cover'}`}
          />
        )}
        <span className={`absolute left-4 top-4 rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] font-semibold ${cat.bg} ${cat.text}`}>
          {cat.label}
        </span>
        {project.award && (
          <span className="absolute bottom-4 left-4 rounded-full border-2 border-ink bg-lime px-3 py-1 font-mono text-[11px] font-semibold text-ink">
            🏆 {project.award}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-muted">{project.meta}</p>
        <h3 className={`mt-2 font-display font-bold leading-tight ${big ? 'text-3xl' : 'text-2xl'}`}>{project.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{project.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.tags.map((t) => (
            <li key={t} className="chip border-ink/20 text-ink/80">
              {t}
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-x-5 pt-5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex min-h-[44px] items-center text-sm font-semibold"
              >
                {l.label} <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all')

  // When another section links to a card (#p-...), make sure it is visible.
  useEffect(() => {
    const onHash = () => window.location.hash.startsWith('#p-') && setFilter('all')
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const shown = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="bg-paper pb-24 pt-6 sm:pb-32 sm:pt-10">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-muted">Projects</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              More things I’ve built
            </h2>
            <p className="mt-4 max-w-xl text-lg text-ink/75">
              Boards, chips, models and apps, from hackathon weekends to semester-long builds.
            </p>
          </div>
          <a href="https://github.com/Advk2k4" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            All repos on GitHub ↗
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {CATEGORIES.map((c) => {
            const count = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-ink px-4 text-sm font-semibold transition-[transform,background-color,color] duration-150 hover:-translate-y-0.5 ${
                  filter === c.id ? 'bg-ink text-paper' : 'bg-paper'
                }`}
              >
                {c.label}
                <span className={`font-mono text-xs ${filter === c.id ? 'text-paper/60' : 'text-muted'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {shown.map((p, i) => (
            <ProjectCard key={p.id} project={p} big={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
