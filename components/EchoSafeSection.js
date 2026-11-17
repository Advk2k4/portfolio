import Image from 'next/image'
import EchoSafeDemo from './EchoSafeDemo'

const FACTS = [
  { value: '4', label: 'MEMS mics, one per quadrant' },
  { value: '5', label: 'sound classes, on-device' },
  { value: '97.5%', label: 'test accuracy' },
  { value: '64 ms', label: 'per inference on the chip' },
]

const PIPELINE = [
  {
    step: '01',
    title: 'Listen',
    body: 'Four ICS-43434 MEMS mics sit around the head and stream 16 kHz audio over two I2S buses into an ESP32-S3.',
  },
  {
    step: '02',
    title: 'Understand',
    body: 'Each clip becomes 31 frames × 13 MFCCs, 403 numbers, computed on the chip exactly the way the training pipeline does it.',
  },
  {
    step: '03',
    title: 'Decide',
    body: 'A small neural net (403 → 128 → 64 → 5) names it: horn, bell, siren, gunshot or background noise. Under 65% confidence, it stays quiet.',
  },
  {
    step: '04',
    title: 'Alert',
    body: 'Arrival-time differences between the mics give the direction. A DRV2605L driver buzzes the motor on that side, and a speaker plays an alert tone.',
  },
]

const TIMELINE = [
  {
    when: 'Feb 2026',
    title: 'Dataset and model',
    body: 'Recorded 1,059 clips through the device’s own mic and ESP32-S3, so training and inference hear the same audio. The model reached 97.5% test accuracy.',
  },
  {
    when: 'Spring 2026',
    title: 'Custom PCB, built and tested',
    body: 'Our KiCad board was fabricated, and the team brought it up and stress-tested it as the capstone build.',
  },
  {
    when: 'Fall 2026',
    title: 'Rev A: five boards',
    body: 'Redesigned it as a 65 × 90 mm central pod plus four earpiece modules. All five are routed, DRC-clean and have fab files ready. Not fabricated yet.',
  },
  {
    when: 'Oct 2026',
    title: 'Firmware on new silicon',
    body: 'Moved the audio path to the ESP-IDF i2s_std driver and built hardware-in-the-loop test tools. On a real ESP32-S3 the on-chip model matched the Python model on 100% of 200 test inputs.',
  },
]

export default function EchoSafeSection() {
  return (
    <section id="echosafe" className="on-dark relative overflow-hidden bg-night py-24 text-paper sm:py-32">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-signal/20 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-cobalt/25 blur-[120px]" aria-hidden="true" />

      <div className="wrap relative">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-paper">
            <Image src="/echosafe_logo.png" alt="EchoSafe logo" fill sizes="56px" className="object-contain p-1.5" />
          </div>
          <p className="kicker text-lime">Featured project · Senior design capstone · Team lead</p>
        </div>

        <h2 translate="no" className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          EchoSafe
        </h2>
        <p className="mt-5 max-w-3xl font-display text-2xl leading-snug text-white/90 sm:text-3xl">
          An ear-worn wearable that tells deaf and hard-of-hearing people what a sound was, and which way it
          came from.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <EchoSafeDemo />

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="kicker text-white/50">The problem</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/85">
                Sirens, car horns and bike bells are warnings you only get if you can hear them. EchoSafe
                listens for them, works out the direction, and buzzes the side of your head the sound came
                from. The whole pipeline runs on the device itself.
              </p>
            </div>
            <div>
              <h3 className="kicker text-white/50">What I owned</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/85">
                I led a senior design team at UMass Amherst. I owned the ML pipeline end to end, from
                recording the dataset on the device to running the model on the chip, plus every
                software-hardware integration: mics over I2S, haptic drivers over I2C, and the speaker
                alerts.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15">
              {FACTS.map((f) => (
                <div key={f.label} className="bg-night p-4">
                  <dt className="font-display text-3xl font-extrabold tabular-nums text-lime">{f.value}</dt>
                  <dd className="mt-1 text-sm text-white/70">{f.label}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2">
              {['ESP32-S3', 'KiCad', 'C/C++ firmware', 'Python', 'TensorFlow', 'I2S', 'I2C', 'MFCC'].map((t) => (
                <span key={t} className="chip border-white/25 text-white/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h3 className="mt-24 font-display text-3xl font-bold sm:text-4xl">How it works</h3>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((p, i) => (
            <li key={p.step} className="group relative rounded-3xl border border-white/15 bg-white/[0.03] p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-lime/60">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-signal">{p.step}</span>
                {i < PIPELINE.length - 1 && (
                  <span aria-hidden="true" className="hidden font-mono text-white/30 lg:inline">→</span>
                )}
              </div>
              <h4 className="mt-6 font-display text-2xl font-bold">{p.title}</h4>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h3 className="font-display text-3xl font-bold sm:text-4xl">Where it is now</h3>
            <p className="mt-4 text-white/70">
              The capstone ended in May. I kept going, redesigning the hardware and moving the firmware onto
              newer drivers.
            </p>
            <a
              href="https://github.com/Advk2k4/echosafe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-6 bg-lime text-ink"
            >
              Read the code on GitHub ↗
            </a>
          </div>
          <ol className="relative border-l-2 border-white/15 pl-8">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-lime bg-night" aria-hidden="true" />
                <p className="font-mono text-sm text-lime">{t.when}</p>
                <h4 className="mt-1 text-xl font-semibold">{t.title}</h4>
                <p className="mt-2 max-w-2xl leading-relaxed text-white/75">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
