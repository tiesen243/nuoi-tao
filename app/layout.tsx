import '@/app/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { Footer, FooterFallback } from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const title = 'Nuoi Tao'
const description =
  'Chương trình nuôi dưỡng, hỗ trợ các bạn học sinh, sinh viên có hoàn cảnh khó khăn vươn lên trong học tập.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: `https://tiesen.id.vn/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    url: 'https://nuoi-tao.vercel.app',
  },
  alternates: { canonical: 'https://nuoi-tao.vercel.app' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'font-sans antialiased min-h-dvh flex flex-col',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        {children}

        <Suspense fallback={<FooterFallback />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
