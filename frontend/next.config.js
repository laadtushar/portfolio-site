/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN ?? process.env.SANITY_TOKEN,
  },
  optimizeFonts: false,
  // Add the following redirect configuration
  async redirects() {
    const redirects = [];
    if (process.env.CHECKIN_REDIRECT) {
      redirects.push({
        source: '/check-in',
        destination: process.env.CHECKIN_REDIRECT,
        permanent: false,
      });
    }
    return redirects;
  },
};

module.exports = nextConfig;
