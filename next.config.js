/** @type {import('next').NextConfig} */
const path = require('path');

const {
  PORT,
  HOST,
  PROTOCOL,
  client_apiKey,
  client_authDomain,
  client_projectId,
  channelsheetId,
  spreadsheetId,
  sheet_apiKey,
  meta_img,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    protocol: PROTOCOL ?? 'http',
    host: HOST ?? 'localhost',
    port: PORT ?? '3000',
    client_apiKey: client_apiKey ?? '',
    client_authDomain: client_authDomain ?? '',
    client_projectId: client_projectId ?? '',
    channelsheetId: channelsheetId ?? '',
    spreadsheetId: spreadsheetId ?? '',
    sheet_apiKey: sheet_apiKey ?? '',
    meta_img: meta_img ?? '',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i.ytimg.com'],
  },
};

module.exports = nextConfig;
