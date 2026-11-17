import '../styles/globals.css'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export default function App({ Component, pageProps }) {
  return (
    <div className={`${display.variable} ${sans.variable} ${mono.variable} font-sans`}>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_ON_VERCEL && <SpeedInsights />}
    </div>
  )
}
