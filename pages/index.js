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
const OG_IMAGE = `${URL}/og.png`

// Structured data (schema.org) so search engines and AI tools can tell who this site is about.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${URL}/#person`,
      name: 'Aadvik Mishra',
      url: URL,
      image: `${URL}/Aadvik.jpeg`,
      email: 'mailto:aadvikmishra7@gmail.com',
      jobTitle: 'Computer Engineer',
      description:
        'Computer engineer (UMass Amherst, B.S. Computer Engineering, May 2026) working across embedded firmware, custom PCB design, VLSI and software, including on-device ML on the ESP32-S3.',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Massachusetts Amherst',
        url: 'https://www.umass.edu',
      },
      knowsAbout: [
        'Embedded systems',
        'Firmware',
        'PCB design',
        'KiCad',
        'ESP32-S3',
        'VLSI',
        'Cadence Virtuoso',
        'Machine learning',
        'Python',
        'Java',
        'C',
        'C++',
      ],
      sameAs: ['https://www.linkedin.com/in/aadvikm', 'https://github.com/Advk2k4'],
    },
    {
      '@type': 'WebSite',
      '@id': `${URL}/#website`,
      url: URL,
      name: 'Aadvik Mishra',
      about: { '@id': `${URL}/#person` },
      author: { '@id': `${URL}/#person` },
    },
    {
      '@type': 'CreativeWork',
      name: 'EchoSafe',
      url: 'https://github.com/Advk2k4/echosafe',
      description:
        'An ear-worn wearable that tells deaf and hard-of-hearing people what a sound was and which way it came from, using on-device sound classification on an ESP32-S3 and directional haptic alerts. Group senior design capstone; Aadvik Mishra was team lead.',
      creator: { '@id': `${URL}/#person` },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Farewise',
      url: 'https://advk2k4.github.io/farewise/',
      applicationCategory: 'TravelApplication',
      operatingSystem: 'Web',
      description:
        'Compares walking, cycling, transit, taxis and driving anywhere in the world with a time and estimated cost, plans multi-stop days and tracks travel spending.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      creator: { '@id': `${URL}/#person` },
    },
    {
      '@type': 'CreativeWork',
      name: 'MicroVibe',
      url: 'https://github.com/Advk2k4/microvibe',
      description:
        'A predictive-maintenance fault lab built from a starter kit: an ESP32-S3 streams vibration data and a Python dashboard flags brake drag and rotor imbalance. Hackachusetts 2026, solo build.',
      creator: { '@id': `${URL}/#person` },
    },
  ],
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
        <meta name="author" content="Aadvik Mishra" />
        <meta property="og:site_name" content="Aadvik Mishra" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Aadvik Mishra, computer engineer: hardware, firmware and software" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
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
        <EchoSafeSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <footer className="on-dark bg-ink py-8 text-paper">
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
