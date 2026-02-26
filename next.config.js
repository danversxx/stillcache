/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Next/Image to optimize remote images (Cloudflare R2, etc.)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev',
        pathname: '/**',
      },
      // Optional: if you ever switch to Sanity image assets later
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
