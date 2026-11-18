// All project content lives here. Every claim must be real: check the repo or ask Aadvik before adding.
// category: 'hardware' | 'vlsi' | 'ml' | 'software'
// visual: an image path in /public, or one of the drawn visuals: 'spectrum' | 'mesh' | 'eeg' | 'layout' | 'code'

export const CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'hardware', label: 'Hardware & embedded' },
  { id: 'vlsi', label: 'Chips & VLSI' },
  { id: 'ml', label: 'ML & AI' },
  { id: 'software', label: 'Software' },
]

export const CATEGORY_STYLE = {
  hardware: { label: 'Hardware', bg: 'bg-signal', text: 'text-ink' },
  vlsi: { label: 'VLSI', bg: 'bg-cobalt', text: 'text-white' },
  ml: { label: 'ML & AI', bg: 'bg-lime', text: 'text-ink' },
  software: { label: 'Software', bg: 'bg-ink', text: 'text-paper' },
}

export const projects = [
  {
    id: 'farewise',
    title: 'Farewise',
    meta: 'Web app · Nov 2026',
    category: 'software',
    visual: '/farewise.jpg',
    blurb:
      'Every way from A to B, priced. Compares walking, cycling, transit, taxis and driving anywhere in the world, each with a time and an estimated cost, plans multi-stop days around fixed times, and tracks what getting around costs. Real timetables where cities publish them, plus offline metro routing for 12 Indian cities. Free, no sign-up, built on open data.',
    tags: ['React', 'TypeScript', 'Vite', 'Leaflet', 'OpenStreetMap'],
    links: [
      { label: 'Live app', href: 'https://advk2k4.github.io/farewise/' },
      { label: 'Code', href: 'https://github.com/Advk2k4/farewise' },
    ],
  },
  {
    id: 'microvibe',
    title: 'MicroVibe',
    meta: 'Hackachusetts 2026 · solo build',
    category: 'hardware',
    visual: 'spectrum',
    blurb:
      'A predictive-maintenance lab made from a $30 starter kit. An ESP32-S3 streams 1 kHz vibration data from a speaker wired up as a sensor. A Python dashboard learns a healthy baseline, tracks the motor speed line with an FFT, and flags brake drag and rotor imbalance, with a kill switch.',
    tags: ['ESP32-S3', 'Arduino C++', 'Python', 'FFT', 'PWM'],
    links: [
      { label: 'Code', href: 'https://github.com/Advk2k4/microvibe' },
      {
        label: 'Demo video',
        href: 'https://drive.google.com/file/d/1WBhOSVz4FCqRZkYgRCOKDjtaB1WR8cLg/view?usp=drivesdk',
      },
    ],
  },
  {
    id: 'noc',
    title: '3×3 mesh network-on-chip',
    meta: 'VLSI coursework · Dec 2025',
    category: 'vlsi',
    visual: 'mesh',
    blurb:
      'Took a 3×3 mesh NoC from RTL through synthesis in Synopsys Design Compiler and place-and-route in Cadence Innovus, then checked that routing stays deadlock-free with mixed-level simulation: post-synthesis netlists running next to RTL tiles.',
    tags: ['Cadence Innovus', 'Synopsys DC', 'Synthesis', 'Place & route'],
    links: [],
  },
  {
    id: 'accumulator',
    title: 'Custom VLSI accumulator',
    meta: 'ECE 558 coursework · Nov 2025',
    category: 'vlsi',
    visual: 'layout',
    blurb:
      'Transistor-level 1-bit and 4-bit ripple-carry accumulator layouts in 45 nm CMOS, drawn in Cadence Virtuoso and checked with DRC and LVS in lab. Along the way: FinFET device behavior and CMOS timing trade-offs.',
    tags: ['Cadence Virtuoso', '45 nm CMOS', 'DRC / LVS', 'Custom layout'],
    links: [],
  },
  {
    id: 'tinytemp',
    title: 'TinyTemp',
    meta: 'Custom PCB · Mar 2025',
    category: 'hardware',
    visual: '/tinytemp.jpeg',
    blurb:
      'A battery-powered digital thermometer on a PCB I designed in KiCad: an ATtiny85, a TMP36 sensor and an SSD1306 OLED. Sleep modes give it about six months of battery life, and an LED warns on overheat.',
    tags: ['KiCad', 'ATtiny85', 'AVR-GCC', 'Embedded C', 'Low power'],
    links: [{ label: 'Code', href: 'https://github.com/Advk2k4/tiny-temp' }],
  },
  {
    id: 'foolingai',
    title: 'Fooling a brain-computer interface',
    meta: 'ECE 547 · team lead · Spring 2026',
    category: 'ml',
    visual: 'eeg',
    blurb:
      'Changing just two of 1,001 samples in an EEG trial pushed an FBCSP + SVM motor-imagery classifier to 21.6% misclassification, with every perturbation staying above the 20 dB imperceptibility line. Targeted gradient attacks beat random noise by up to 10.8×.',
    tags: ['Python', 'scikit-learn', 'Adversarial ML', 'EEG'],
    links: [{ label: 'Code + report', href: 'https://github.com/Advk2k4/foolingAI-547' }],
  },
  {
    id: 'digit',
    title: 'Digit recognition on an FPGA',
    meta: 'Team project · Oct 2024',
    category: 'hardware',
    visual: '/DigitDetection.png',
    blurb:
      'Trained a fully connected network in Python, exported the weights, and ran inference on a DE1-SoC: tiled matrix multiplication on the FPGA through OpenCL, driven by the ARM Cortex-A9, validated with hardware-in-the-loop testing.',
    tags: ['C', 'OpenCL', 'Python', 'DE1-SoC', 'ARM Cortex-A9'],
    links: [{ label: 'Code', href: 'https://github.com/epeter11/ECE332' }],
  },
  {
    id: 'bias',
    title: 'Bias detection in automated hiring',
    meta: 'Research project · May 2025',
    category: 'ml',
    visual: '/Bias.jpeg',
    blurb:
      'Batch-prompting and parsing pipelines on the OpenAI API ran fairness audits across 480 controlled résumés. TF-IDF and statistical tests then showed name-based demographic bias in the simulated hiring decisions.',
    tags: ['Python', 'OpenAI API', 'TF-IDF', 'Statistics'],
    links: [{ label: 'Code', href: 'https://github.com/Advk2k4/BiasDetectionModel' }],
  },
  {
    id: 'safestride',
    title: 'SafeStride',
    meta: 'HackHer413 · team',
    award: 'Best UX / Product Design Hack',
    category: 'software',
    visual: '/SafeStride.png',
    blurb:
      'A campus walking-buddy web app. Students heading the same way get paired up as Striders and Stridees, with OTP sign-up, trusted contacts and a safety review after each walk.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    links: [
      { label: 'Code', href: 'https://github.com/sheldor1510/safestride' },
      {
        label: 'Demo video',
        href: 'https://www.youtube.com/watch?v=sezqMUveo20',
      },
    ],
  },
  {
    id: 'asl',
    title: 'Real-time sign language recognition',
    meta: 'Computer vision · 2025',
    category: 'ml',
    visual: '/ASL.jpeg',
    blurb:
      'Reads ASL and ISL letters from a live webcam feed. MediaPipe tracks the hand, a KNN model classifies the finger pose, and streamlit-webrtc shows the prediction as you sign.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'KNN', 'Streamlit'],
    links: [
      { label: 'Code', href: 'https://github.com/Advk2k4/asl-app' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=_ZuMkJ-Eqhw' },
    ],
  },
  {
    id: 'heart',
    title: 'Heart rate monitor',
    meta: 'ESP32 · 2025',
    category: 'hardware',
    visual: '/health.jpeg',
    blurb:
      'Real-time pulse readout on an ESP32 with a MAX30100 sensor over I2C, streaming the waveform to the serial plotter and the BPM to the console.',
    tags: ['ESP32', 'MAX30100', 'Arduino C++', 'I2C'],
    links: [{ label: 'Code', href: 'https://github.com/Advk2k4/heart-rate-monitor' }],
  },
  {
    id: 'sentiment',
    title: 'Facial + text sentiment analyzer',
    meta: 'Computer vision · 2025',
    category: 'ml',
    visual: '/Sentiment.png',
    blurb:
      'Reads emotion from webcam frames or uploaded photos and combines it with the sentiment of typed text, in a Streamlit app built on TensorFlow, OpenCV and VADER.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'NLP'],
    links: [
      { label: 'Code', href: 'https://github.com/Advk2k4/sentiment-analysis' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=mjO0FVW-aDs' },
    ],
  },
  {
    id: 'uplay',
    title: 'UPlay!',
    meta: 'HackUMass X · team',
    award: 'Best Beginner Hack',
    category: 'software',
    visual: '/UPlay!.png',
    blurb:
      'A location-based web platform built over one hackathon weekend, with a Django back end wired to outside APIs.',
    tags: ['Django', 'Python', 'HTML', 'APIs'],
    links: [
      { label: 'Code', href: 'https://github.com/sheldor1510/uplay' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=SBdNoN1nVDw' },
    ],
  },
  {
    id: 'medway',
    title: 'Medway',
    meta: 'In progress',
    category: 'software',
    visual: '/logo.png',
    contain: true,
    blurb:
      'An appointment and queue tracker for clinics, so patients can see live wait times instead of sitting in a waiting room. React and Vite on the front end, Firebase for sign-in and email verification.',
    tags: ['React', 'Vite', 'Firebase', 'Tailwind'],
    links: [{ label: 'Code', href: 'https://github.com/Advk2k4/medway' }],
  },
  {
    id: 'clearn',
    title: 'Interactive C-learning app',
    meta: 'Web app · Streamlit',
    category: 'software',
    visual: 'code',
    blurb:
      'Learn C in the browser: 53 lessons across 11 units, with quizzes, tests, a code playground, and spaced repetition on 1, 2, 4 and 8-day intervals. XP and streaks keep you coming back.',
    tags: ['Python', 'Streamlit', 'Spaced repetition'],
    links: [],
  },
  {
    id: 'foodscout',
    title: 'FoodScout',
    meta: 'Web app · 2025',
    category: 'software',
    visual: '/FoodScout.png',
    blurb:
      'A mobile-friendly Streamlit app for finding somewhere to eat, filtered by cuisine, rating and distance.',
    tags: ['Python', 'Streamlit', 'Pandas'],
    links: [
      { label: 'Code', href: 'https://github.com/Advk2k4/FoodRecs' },
      { label: 'Live app', href: 'https://foodrecs-by-aadvik.streamlit.app/' },
    ],
  },
]

export const projectTitle = (id) =>
  id === 'echosafe' ? 'EchoSafe' : projects.find((p) => p.id === id)?.title ?? id
