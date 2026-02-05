/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, 
  },
  // Aktifkan ini kembali untuk debugging yang bersih di Vercel
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: false,
  }
};

module.exports = nextConfig;