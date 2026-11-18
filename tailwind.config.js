/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.js'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E8',
        cream: '#EDE7DA',
        ink: '#141414',
        muted: '#5C574F',
        night: '#0F1013',
        signal: '#FF5B23',
        cobalt: '#1F45F5',
        lime: '#D5F542',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrap: '76rem',
      },
    },
  },
  plugins: [],
}
