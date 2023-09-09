// next.config.js
const { withContentlayer } = require('next-contentlayer');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

module.exports = withContentlayer(nextConfig);
// module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
