/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // SKIP SEMUA ERROR TYPESCRIPT
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;