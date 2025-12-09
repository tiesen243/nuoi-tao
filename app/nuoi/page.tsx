import Image from 'next/image'
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NuoiPage() {
  return (
    <main className='container grid md:grid-cols-3 gap-8 md:gap-4 py-24'>
      <h1 className='sr-only'>Nuoi Tao Payment Page</h1>

      <section className='flex flex-col items-center gap-4'>
        <h2 className='sr-only'>QR Code Instruction Section</h2>

        <div className='relative w-1/2 aspect-square border border-accent rounded-lg shadow-sm'>
          <Image
            src='https://qr.sepay.vn/img?acc=109876529294&bank=VietinBank&des=SEVQR+TKPYKN&amount=10000'
            alt='QR Code'
            sizes='(max-width: 768px) 50vw, 100vw'
            className='object-cover rounded-xl mx-auto'
            fill
          />
        </div>

        <CardTitle className='text-center text-lg'>
          Scan this QR code with your banking app to proceed with the payment.
        </CardTitle>

        <div className='grid grid-cols-2 gap-4'>
          <Button size='sm'>
            <ExternalLinkIcon /> Open in Banking App
          </Button>
          <Button variant='outline' size='sm' asChild>
            <a
              href='https://qr.sepay.vn/img?acc=109876529294&bank=VietinBank&des=SEVQR+TKPYKN'
              download='NuoiTao_QR_Code.png'
            >
              <DownloadIcon /> Download QR Code
            </a>
          </Button>
        </div>
      </section>

      <section className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm md:col-span-2'>
        <h2 className='sr-only'>Payment Details Section</h2>

        <CardHeader className='relative h-24'>
          <Image
            src='/assets/images/logo-vietinbank-insacmau.png'
            alt='VietinBank Logo'
            className='object-contain object-left px-6'
            fill
          />
        </CardHeader>
        <CardContent className='flex-1'>
          {Object.entries(paymentDetails).map(([key, value]) => (
            <div
              key={key}
              className='flex justify-between border-b py-2 last:border-0 last:pb-0'
            >
              <span className='font-medium capitalize'>
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className='font-mono'>
                {key === 'amount'
                  ? new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(Number(value))
                  : value}
              </span>
            </div>
          ))}
        </CardContent>

        <CardFooter className='flex justify-between border-t'>
          <span className='font-semibold text-chart-12'>Amount</span>
          <span className='font-mono font-bold text-chart-12'>10,000 VND</span>
        </CardFooter>
      </section>
    </main>
  )
}

const paymentDetails = {
  accountName: 'TRAN TIEN',
  accountNumber: '109876529294',
  content: 'SEVQR TKPYKN',
}
