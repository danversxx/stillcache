/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
    ],

    /* TRAP: R2 URLs are immutable — long TTL stops re-transforming the same
       image every cache expiry. This is what keeps usage a one-time cost. */
    minimumCacheTTL: 2678400,

    /* WebP only. AVIF is ~20% smaller but doubles cache entries per image,
       and transformation count is the constrained resource here, not bytes. */
    formats: ['image/webp'],

    /* Trimmed from Next's 8 defaults. Widest thing rendered is a 400px poster
       and a 360px still — 1920 covers mobile full-bleed at 3x. */
    deviceSizes: [640, 828, 1080, 1920],
  },
};

module.exports = nextConfig;
