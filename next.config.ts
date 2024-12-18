import path from 'node:path';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: false,
});

// const isDevelopment = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true, // biome 에러발생시 주석 해제
  },
  typescript: {
    // !! WARN !!
    // ts빌드 에러를 무시하고 싶다면 아래 옵션을 true로 변경하세요.
    ignoreBuildErrors: false,
  },
  // experimental: {
  //   optimizePackageImports: ["@mantine/core", "@mantine/hooks"], // tree shaking, 제대로 작동하지 않음.
  // },
  reactStrictMode: true,
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn', 'log', 'info'],
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')], // style 폴더에 있는 파일은 이름만으로 import 가능(경로 축약)
    prependData: `
      @use "var";
      @use "util";
      @use "placeholder";
    `, // 위 파일은 import 하지 않아도 된다.
    silenceDeprecations: ['legacy-js-api'], // sass warning 제거
    logger: {
      warn: (message: any) => console.warn(message),
      debug: (message: any) => console.log(message),
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ytimg.com',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL,
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/viewer',
        destination: 'https://yt.grs0412.workers.dev',
      },
    ];
  },
  webpack: (config) => {
    /** SVGR **/
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));
    fileLoaderRule.exclude = /\.svg$/i;
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

    return config;
  },
  experimental: {
    reactCompiler: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
        },
        '*.scss': {
          loaders: ['sass-loader'],
        },
      },
    },
  },
};

// turbopack 호환 안될시 롤백
export default withSentryConfig(withBundleAnalyzer(nextConfig), {
  org: 'yisp',
  project: 'liveuta',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false, // Can be used to suppress logs
  autoInstrumentMiddleware: false,
  sourcemaps: {
    disable: true,
  },
});
