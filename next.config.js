/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i.ytimg.com'],
  },
};

module.exports = nextConfig;
