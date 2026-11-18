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

**Next.js 15 Pages Router**, plain JavaScript, Tailwind CSS 3. One page (`pages/index.js`) renders every section in order with `id` anchors, in this order: `#home`, `#about`, `#echosafe`, `#projects`, `#experience`, `#skills`, `#contact`. Between differently coloured sections, `pages/index.js` renders a `Blend` (a tall `.blend` gradient, oklab) so sections flow into each other; keep one between any two sections with different backgrounds. Project cards have their own anchors (`#p-<id>`), used by the skills explorer.

No runtime dependencies besides `next`, `react`, `react-dom` and `@vercel/speed-insights`. All motion is CSS or plain canvas/SVG. Keep it that way unless Aadvik approves a new package.

**Design system** (`tailwind.config.js`, `styles/globals.css`):
- Colors: `paper` (cream base), `ink`, `muted`, `night` (dark band), `signal` (orange), `cobalt`, `lime`. No violet.
- Fonts via `next/font/google` in `pages/_app.js`: Bricolage Grotesque (`font-display`), Geist (`font-sans`), Geist Mono (`font-mono`).
- Shared classes: `.wrap` (page container), `.kicker`, `.btn` + `.btn-solid` / `.btn-outline`, `.chip`, `.link-draw`, `.enter` (hero entrance, stagger with `--d`).
- Every animation must respect `prefers-reduced-motion` (handled globally in `globals.css`).

**Components** (`components/`):
- `Navigation`: fixed pill nav, IntersectionObserver active state, full-screen mobile menu.
- `Hero` + `SignalCanvas`: name, one-line intro, CTAs, link pills, photo sticker; canvas of circuit traces (masked away from the text) with pulses that react to the pointer (small pause button, pauses off-screen).
- `EchoSafeSection` + `EchoSafeDemo`: the featured capstone. The demo is an interactive illustration (pick a sound, click around the head, mics light up in arrival order, nearest motor buzzes; optional Web Audio synth).
- `ProjectsSection` + `ProjectVisuals`: filterable card grid. `ProjectVisuals` draws a visual for every card (`route`, `spectrum`, `mesh`, `layout`, `thermo`, `eeg`, `digit`, `bias`, `walk`, `hand`, `ecg`, `mood`, `pins`, `queue`, `code`, `food`). Keep them deterministic (no `Math.random`).
- `Cursor`: replaces the system cursor with one circle (never both) on fine pointers; grows over interactive elements, light outline inside `.on-dark` sections. Off under reduced motion.
- `AboutSection` (intro, facts, stats strip; sits right after the hero), `ExperienceSection`, `SkillsSection` (skill explorer: click a skill to see where it was used), `ContactSection` (email shown once). The footer lives in `pages/index.js`.

`next.config.js` exposes `NEXT_PUBLIC_ON_VERCEL` so Speed Insights only loads on Vercel builds.

## Content Updates

- **Projects**: edit the `projects` array in `lib/projects.js`. Fields: `id`, `title`, `meta`, `category` (`hardware`|`vlsi`|`ml`|`software`), `visual` (a key of `VISUALS` in `components/ProjectVisuals.js`), `blurb`, `tags`, `links`, optional `award`, `contain`.
- **Skills**: edit `skillGroups` in `lib/skills.js`. `used` lists project ids or `role:*` keys as evidence.
- **EchoSafe**: `FACTS`, `PIPELINE`, `TIMELINE` at the top of `components/EchoSafeSection.js`.
- **Experience**: `experiences` array in `components/ExperienceSection.js`.
- **Resume**: replace `public/AadvikMishra_Resume.pdf`. **Profile image**: `public/Aadvik.jpeg`.

## Content rules

- Every claim must be real. Never invent projects, metrics, employers or skills.
- Aadvik graduated in May 2026; never call him a student.
- Do not claim Docker, Linux, TCL, Perl, Verilog or Assembly.
- EchoSafe is a group senior design capstone (Aadvik: team lead, ML pipeline, all software-hardware integration). It is ear-worn, not a wrist device.
- EchoSafe accuracy on the site is 91% (Aadvik's call). Keep it consistent in `AboutSection.js` and `EchoSafeSection.js`.
- No em dashes in site text.
