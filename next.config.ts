/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // HAPUS SETELAH SEMUA BERES
  },
  eslint: {
    ignoreDuringBuilds: true, // HAPUS SETELAH SEMUA BERES
  }
};

module.exports = nextConfig;