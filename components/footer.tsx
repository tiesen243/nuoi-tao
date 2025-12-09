'use client'

export function Footer() {
  return (
    <footer className='w-full border-t py-6 mt-auto bg-background text-muted-foreground text-center text-sm'>
      © {new Date().getFullYear()} Nuôi Tao. Được xây dựng với {'<'}4 tại Việt
      Nam.
    </footer>
  )
}

export function FooterFallback() {
  return (
    <footer className='w-full border-t py-6 mt-auto bg-background text-muted-foreground text-center text-sm'>
      Đang tải chân trang...
    </footer>
  )
}
