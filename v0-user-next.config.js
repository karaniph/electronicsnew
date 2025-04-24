/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    domains: ["electronichub.com"],
    // Limit image sizes to reduce bandwidth
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable production source maps for better error tracking
  productionBrowserSourceMaps: true,

  // Optimize for production
  swcMinify: true,

  // Configure headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },

  // Configure redirects
  async redirects() {
    return [
      {
        source: "/components/:path*",
        destination: "/component/:path*",
        permanent: true,
      },
      {
        source: "/categories/:path*",
        destination: "/category/:path*",
        permanent: true,
      },
    ]
  },

  // Configure environment variables that can be exposed to the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || "https://electronichub.com",
  },

  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
