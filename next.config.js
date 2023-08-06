/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        pathname: '/photo-.*',
      },
      {
        hostname: 'unsplash.com',
        protocol: 'https',
      },
    ]
  }
}

module.exports = nextConfig
