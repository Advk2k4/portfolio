import Head from 'next/head'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import EchoSafeSection from '../components/EchoSafeSection'
import ProjectsSection from '../components/ProjectsSection'
import ExperienceSection from '../components/ExperienceSection'
import SkillsSection from '../components/SkillsSection'
import ContactSection from '../components/ContactSection'
import Cursor from '../components/Cursor'

const TITLE = 'Aadvik Mishra · Computer Engineer'
const DESCRIPTION =
  'Computer engineer (UMass Amherst ’26) who designs PCBs, writes firmware and trains on-device ML. Creator of EchoSafe, an ear-worn sound-alert wearable for deaf and hard-of-hearing users.'
const URL = 'https://aadvik.vercel.app'

// Section colours, in page order. Each pair gets a tall gradient between them.
const C = {
  paper: '#F5F1E8',
  night: '#0F1013',
  cobalt: '#1F45F5',
  lime: '#D5F542',
  signal: '#FF5B23',
  ink: '#141414',
}

function Blend({ from, to }) {
  return <div aria-hidden="true" className="blend" style={{ '--from': from, '--to': to }} />
}

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${URL}/Aadvik.jpeg`} />
        <meta name="twitter:card" content="summary" />
      </Head>

      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Cursor />
      <Navigation />
      <main id="main">
        <Hero />
        <AboutSection />
        <Blend from={C.paper} to={C.night} />
        <EchoSafeSection />
        <Blend from={C.night} to={C.paper} />
        <ProjectsSection />
        <Blend from={C.paper} to={C.cobalt} />
        <ExperienceSection />
        <Blend from={C.cobalt} to={C.lime} />
        <SkillsSection />
        <Blend from={C.lime} to={C.signal} />
        <ContactSection />
        <Blend from={C.signal} to={C.ink} />
      </main>
      <footer className="on-dark bg-ink pb-8 text-paper">
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
