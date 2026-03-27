import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local backend images
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8080',
        pathname: '/**',
      },

      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },

      // ✅ ADD THIS (IMPORTANT)
      {
        protocol: 'https',
        hostname: 'shehrikisaan.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shehrikisaan.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
}

export default nextConfig