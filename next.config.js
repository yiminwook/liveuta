/** @type {import('next').NextConfig} */
const path = require("path");

const {
  client_apiKey,
  client_authDomain,
  client_projectId,
  spreadsheetId,
  sheet_apiKey,
} = process.env;

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    client_apiKey: client_apiKey || "",
    client_authDomain: client_authDomain || "",
    client_projectId: client_projectId || "",
    spreadsheetId: spreadsheetId || "",
    sheet_apiKey: sheet_apiKey || "",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["i.ytimg.com"],
  },
};

module.exports = nextConfig;
