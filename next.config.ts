import type { NextConfig } from 'next'

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  typedRoutes: true,
} satisfies NextConfig

export default nextConfig
