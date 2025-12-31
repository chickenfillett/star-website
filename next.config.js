/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,
  // 修复警告：多 lockfiles 和跨域请求
  experimental: {
    allowedDevOrigins: ['http://192.168.1.9', 'http://localhost'],
  },
}

module.exports = nextConfig
