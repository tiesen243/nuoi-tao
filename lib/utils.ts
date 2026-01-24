import type { ClassValue } from 'clsx'

import { getCloudflareContext } from '@opennextjs/cloudflare'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return window.location.origin

  const { env } = getCloudflareContext()
  if (env.APP_URL) return `https://${env.APP_URL}`

  return 'http://localhost:3000'
}
