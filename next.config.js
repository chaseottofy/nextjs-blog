// next.config.js
const { withContentlayer } = require('next-contentlayer')
// import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};


// export default withContentlayer(nextConfig);
// module.exports = nextConfig
module.exports = withContentlayer(nextConfig);
