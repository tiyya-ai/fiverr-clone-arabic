/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  images: {
        domains: ['localhost', 'uploadthing.com', 'utfs.io', 'wbl3.com', 'fiverr-res.cloudinary.com', 'cdn-icons-png.flaticon.com', 'images.unsplash.com', 'images.pexels.com'],
    },
  // Skip database operations during build
  env: {
    SKIP_DATABASE_OPERATIONS: process.env.NODE_ENV === 'production' ? 'true' : 'false'
  },
  // Disable static export for dynamic routes
  trailingSlash: false,
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