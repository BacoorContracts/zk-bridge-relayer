/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_RELAYER: process.env.RELAYER
  }
}

module.exports = nextConfig
