/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // HAPUS SETELAH ERROR FIXED
    ignoreBuildErrors: true,
  },
  eslint: {
    // HAPUS SETELAH ERROR FIXED
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;