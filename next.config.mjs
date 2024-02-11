import NextBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const __dirname = path.resolve();

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: false,
});

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `uta_${hash}`,
});

const isDevelopment = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/style')],
  },
  images: {
    domains: ['i.ytimg.com'],
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
  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  typescript: {
    // !! WARN !!
    // ts빌드 에러를 무시하고 싶다면 아래 옵션을 true로 변경하세요.
    ignoreBuildErrors: false,
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
