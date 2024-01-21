/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i.ytimg.com'],
  },
  webpack: (config, options) => {
    if (!isDevelopment) {
      // config.externals.push({ 'lottie-web': 'lottie' });
    }
    return { ...config };
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-store, max-age=0',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
