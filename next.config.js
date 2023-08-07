/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https',
        pathname: "**"
      },
    ]
  }
}

module.exports = nextConfig
