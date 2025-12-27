import { DownloadIcon } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function NuoiPage() {
  const qrUrl = useMemo(() => {
    const acc = encodeURIComponent(
      paymentDetails.find((item) => item.key === 'Số tài khoản')?.value ?? '',
    )
    const bank = encodeURIComponent(
      paymentDetails.find((item) => item.key === 'Ngân hàng')?.value ?? '',
    )
    const des = encodeURIComponent(
      paymentDetails.find((item) => item.key === 'Nội dung chuyển khoản')
        ?.value ?? '',
    )

    return `https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&des=${des}`
  }, [paymentDetails])

  return (
    <main className='flex-1 container grid md:grid-cols-3 gap-8 md:gap-4 py-24'>
      <h1 className='sr-only'>Trang Thanh Toán Nuôi Tao</h1>

      <section className='flex flex-col items-center gap-4'>
        <h2 className='sr-only'>Phần Hướng Dẫn Quét Mã QR</h2>

        <div className='relative w-1/2 aspect-square border border-accent rounded-lg shadow-sm'>
          <Image
            src={qrUrl}
            alt='QR Code'
            sizes='(max-width: 768px) 50vw, 100vw'
            className='object-cover rounded-xl mx-auto'
            fill
          />
        </div>

        <CardTitle className='text-center text-lg'>
          Quét mã QR này bằng ứng dụng ngân hàng của bạn để tiến hành thanh
          toán.
        </CardTitle>

        <Button
          variant='outline'
          size='sm'
          nativeButton={false}
          render={<a href={qrUrl} download='NuoiTao_QR_Code.png' />}
        >
          <DownloadIcon /> Tải mã QR
        </Button>
      </section>

      <section className='ring-foreground/10 md:col-span-2 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 text-sm ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col'>
        <h2 className='sr-only'>Phần Chi Tiết Thanh Toán</h2>

        <div className='w-1/3 mx-4 relative aspect-3/1'>
          <Image
            src='/assets/images/logo-vietinbank-insacmau.png'
            alt='VietinBank Logo'
            className='object-cover object-left'
            fill
          />
        </div>

        <CardHeader className='flex-1'>
          {paymentDetails.map(({ key, value }) => (
            <div
              key={key}
              className='flex justify-between border-b py-2 last:border-0 last:pb-0'
            >
              <span className='font-medium capitalize'>
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className='font-mono'>{value}</span>
            </div>
          ))}
        </CardHeader>

        <CardFooter className='flex justify-between border-t'>
          <span className='font-semibold'>Số tiền đề xuất đóng góp</span>
          <span className='font-mono font-bold text-primary dark:brightness-125'>
            Tùy tâm
          </span>
        </CardFooter>
      </section>
    </main>
  )
}

const paymentDetails = [
  { key: 'Ngân hàng', value: 'VietinBank' },
  { key: 'Chủ tài khoản', value: 'TRAN TIEN' },
  { key: 'Số tài khoản', value: '109876529294' },
  { key: 'Nội dung chuyển khoản', value: 'SEVQR TKPYKN' },
] as const
