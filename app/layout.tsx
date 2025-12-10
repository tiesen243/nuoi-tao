import '@/app/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'

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
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased min-h-dvh flex flex-col',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}

          <footer className='bg-card text-card-foreground border-t py-12'>
            <div className='container'>
              <div className='grid md:grid-cols-4 gap-8 mb-8'>
                <Link href='/' className='space-y-4'>
                  <p className='font-bold text-lg'>Nuôi Tao</p>
                  <p className='text-sm'>
                    Nuôi dưỡng tài năng, phát triển tương lai (của tao).
                  </p>
                </Link>

                <div className='space-y-4'>
                  <h4 className='font-semibold text-sm'>Liên kết</h4>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {['Về chúng tôi', 'Chương trình', 'Học sinh'].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href='https://youtu.be/dQw4w9WgXcQ'
                            className='hover:text-accent-foreground transition-colors'
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
                  <h4 className='font-semibold text-sm'>Hỗ trợ</h4>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {['Câu hỏi thường gặp', 'Hỗ trợ', 'Chính sách'].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href='https://youtu.be/dQw4w9WgXcQ'
                            className='hover:text-accent-foreground transition-colors'
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
                  <h4 className='font-semibold text-sm'>Kết nối</h4>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {['Facebook', 'Instagram', 'LinkedIn'].map((item) => (
                      <li key={item}>
                        <a
                          href='https://youtu.be/dQw4w9WgXcQ'
                          className='hover:text-accent-foreground transition-colors'
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
              <div className='border-t pt-8 text-center text-sm text-muted-foreground'>
                <p>&copy; 2025 Nuôi Tao. Tất cả các quyền được bảo lưu.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
