/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
        domains: ['localhost', 'uploadthing.com', 'utfs.io', 'wbl3.com', 'fiverr-res.cloudinary.com', 'cdn-icons-png.flaticon.com', 'images.unsplash.com', 'images.pexels.com'],
    },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig