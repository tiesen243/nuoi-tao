import '@/app/globals.css'

import type { Metadata } from 'next'

import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const title = 'Nuôi Tao'
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
    <html lang='en' className='dark' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        {children}

        <footer className='border-t bg-card py-12 text-card-foreground'>
          <div className='container'>
            <div className='mb-8 grid gap-8 md:grid-cols-4'>
              <Link href='/' className='space-y-4'>
                <p className='text-lg font-bold'>Nuôi Tao</p>
                <p className='text-sm'>
                  Nuôi dưỡng tài năng, phát triển tương lai (của tao).
                </p>
              </Link>

              <div className='space-y-4'>
                <h4 className='text-sm font-semibold'>Liên kết</h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  {['Về chúng tôi', 'Chương trình', 'Học sinh'].map((item) => (
                    <li key={item}>
                      <a
                        href='https://youtu.be/dQw4w9WgXcQ'
                        className='transition-colors hover:text-accent-foreground'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='space-y-4'>
                <h4 className='text-sm font-semibold'>Hỗ trợ</h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  {['Câu hỏi thường gặp', 'Hỗ trợ', 'Chính sách'].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href='https://youtu.be/dQw4w9WgXcQ'
                          className='transition-colors hover:text-accent-foreground'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {item}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className='space-y-4'>
                <h4 className='text-sm font-semibold'>Kết nối</h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  {['Facebook', 'Instagram', 'LinkedIn'].map((item) => (
                    <li key={item}>
                      <a
                        href='https://youtu.be/dQw4w9WgXcQ'
                        className='transition-colors hover:text-accent-foreground'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className='border-t pt-8 text-center text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Nuôi Tao. Được xây dựng với {'<'}4
              bởi{' '}
              <Button
                variant='link'
                nativeButton={false}
                className='px-0'
                render={
                  <a
                    href='https://tiesen.id.vn'
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                tiesen243
              </Button>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
