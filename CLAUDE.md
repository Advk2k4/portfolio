# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
```

No test runner or linter is configured.

## Architecture

**Next.js 15 Pages Router**, plain JavaScript, Tailwind CSS 3. One page (`pages/index.js`) renders every section in order with `id` anchors: `#home`, `#echosafe`, `#projects`, `#experience`, `#skills`, `#about`, `#contact`. Project cards have their own anchors (`#p-<id>`), used by the skills explorer.

No runtime dependencies besides `next`, `react`, `react-dom` and `@vercel/speed-insights`. All motion is CSS or plain canvas/SVG. Keep it that way unless Aadvik approves a new package.

**Design system** (`tailwind.config.js`, `styles/globals.css`):
- Colors: `paper` (cream base), `ink`, `muted`, `night` (dark band), `signal` (orange), `cobalt`, `lime`. No violet.
- Fonts via `next/font/google` in `pages/_app.js`: Bricolage Grotesque (`font-display`), Geist (`font-sans`), Geist Mono (`font-mono`).
- Shared classes: `.wrap` (page container), `.kicker`, `.btn` + `.btn-solid` / `.btn-outline`, `.chip`, `.link-draw`, `.enter` (hero entrance, stagger with `--d`).
- Every animation must respect `prefers-reduced-motion` (handled globally in `globals.css`).

**Components** (`components/`):
- `Navigation`: fixed pill nav, IntersectionObserver active state, full-screen mobile menu.
- `Hero` + `SignalCanvas`: name, intro, CTAs, stats strip; canvas of circuit traces with pulses that react to the pointer (pausable, pauses off-screen).
- `EchoSafeSection` + `EchoSafeDemo`: the featured capstone. The demo is an interactive illustration (pick a sound, click around the head, mics light up in arrival order, nearest motor buzzes; optional Web Audio synth).
- `ProjectsSection` + `ProjectVisuals`: filterable card grid. `ProjectVisuals` draws visuals for projects without a photo (`spectrum`, `mesh`, `eeg`).
- `ExperienceSection`, `SkillsSection` (skill explorer: click a skill to see where it was used), `AboutSection`, `ContactSection` (includes the footer).

`next.config.js` exposes `NEXT_PUBLIC_ON_VERCEL` so Speed Insights only loads on Vercel builds.

## Content Updates

- **Projects**: edit the `projects` array in `lib/projects.js`. Fields: `id`, `title`, `meta`, `category` (`hardware`|`vlsi`|`ml`|`software`), `visual` (image path in `/public` or `spectrum`|`mesh`|`eeg`), `blurb`, `tags`, `links`, optional `award`, `contain`.
- **Skills**: edit `skillGroups` in `lib/skills.js`. `used` lists project ids or `role:*` keys as evidence.
- **EchoSafe**: `FACTS`, `PIPELINE`, `TIMELINE` at the top of `components/EchoSafeSection.js`.
- **Experience**: `experiences` array in `components/ExperienceSection.js`.
- **Resume**: replace `public/AadvikMishra_Resume.pdf`. **Profile image**: `public/Aadvik.jpeg`.

## Content rules

- Every claim must be real. Never invent projects, metrics, employers or skills.
- Aadvik graduated in May 2026; never call him a student.
- Do not claim Docker, Linux, TCL, Perl, Verilog or Assembly.
- EchoSafe is a group senior design capstone (Aadvik: team lead, ML pipeline, all software-hardware integration). It is ear-worn, not a wrist device.
- No em dashes in site text.
