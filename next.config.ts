import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig = {
  // cacheComponents: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  typedRoutes: true,
} satisfies NextConfig

export default nextConfig

initOpenNextCloudflareForDev()
