/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure webpack for better Framer Motion support
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Fix workspace root detection
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig