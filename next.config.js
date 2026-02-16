/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev',
      },
    ],
  },
}

module.exports = nextConfig