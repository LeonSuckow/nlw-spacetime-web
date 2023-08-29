/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      '192.168.1.3',
      'nlw-spacetime-server-production.up.railway.app',
    ],
  },
}

module.exports = nextConfig
