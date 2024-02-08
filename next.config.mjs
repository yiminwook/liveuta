import NextBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';

const __dirname = path.resolve();

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: false,
});

const isDevelopment = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/style')],
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
  compiler: {
    emotion: true,
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

export default withBundleAnalyzer(nextConfig);
