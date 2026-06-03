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

This is a **Next.js Pages Router** single-page portfolio site written in plain JavaScript (no TypeScript). All content is hardcoded directly in component files — there is no CMS, database, or data layer.

**Page structure**: `pages/index.js` is the only page. It renders all sections sequentially with `id` anchors (`#home`, `#about`, `#experience`, `#projects`, `#skills`, `#contact`). The `Navigation` component does smooth-scroll between these anchors using `window.scrollTo`.

**Styling**: Tailwind CSS with a strict all-black background (`bg-black`, `#000` enforced in `globals.css`) and white text. The custom `font-bodoni` Tailwind class maps to Bodoni Moda serif (defined in `tailwind.config.js`).

**Components in use by `pages/index.js`**:
- `Navigation` — fixed navbar with scroll-aware active section detection and mobile hamburger menu
- `ExperienceSection` — static left-border timeline, content hardcoded directly in JSX
- `ProjectsSection` — filterable grid of project cards; all project data (title, description, tags, image, links, category) is a hardcoded array at the top of the file
- `SkillsSection` — categorized skill badges; skills are a hardcoded object in the component

**Components that exist but are NOT currently used** in `pages/index.js`:
- `HeroSection.js` — an alternative hero with a `TextTrail` animation (imports a `TextTrail` component that doesn't exist in the repo)
- `AnimatedBackground.js` — Vanta.js BIRDS animation using Three.js; loads via dynamic import to avoid SSR issues
- `ModernButton.js` — reusable `<a>`/`<button>` with shimmer/particle hover effects; accepts `variant` (`primary`|`secondary`|`outline`) and `size` (`sm`|`md`|`lg`) props

## Content Updates

- **Projects**: Edit the `projects` array in `components/ProjectsSection.js`. Each entry has `id`, `title`, `description`, `image` (path relative to `/public/`), `tags` (array), `category` (`ai`|`embedded`|`fullstack`), `githubUrl`, `liveUrl` (nullable), and `featured` (boolean).
- **Experience**: Edit JSX directly in `components/ExperienceSection.js`.
- **Skills**: Edit the `categories` object in `components/SkillsSection.js`.
- **Resume**: Replace `public/AadvikMishra_Resume.pdf`.
- **Profile image**: Replace `public/Aadvik.jpeg`; it is referenced in the inlined hero in `pages/index.js`.
