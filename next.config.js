/** @type {import('next').NextConfig} */
module.exports = {
  // Vercel sets VERCEL=1 during its builds. Speed Insights only works there, so local
  // builds skip it instead of logging a 404 for its script.
  env: {
    NEXT_PUBLIC_ON_VERCEL: process.env.VERCEL ? '1' : '',
  },
}
