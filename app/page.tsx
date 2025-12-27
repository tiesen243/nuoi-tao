import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { Year } from '@/app/page.client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { reasons, why, peoples, commits } from '@/lib/content'

export default function HomePage() {
  return (
    <main className='flex flex-col gap-16 pb-16'>
      <h1 className='sr-only'>Nuoi Tao Program</h1>

      <section className='flex flex-col items-center gap-4 bg-linear-to-br from-accent/40 via-accent-foreground/40 to-accent/40 py-32 px-4'>
        <h2 className='text-8xl text-center font-black from-chart-4 via-chart-3 to-chart-2 w-fit bg-clip-text text-transparent bg-linear-to-br drop-shadow-xl'>
          Nuôi Tao
        </h2>

        <p className='max-w-2xl text-center text-lg drop-shadow-xl'>
          Chương trình nuôi tao là một sáng kiến nhằm kết nối những người muốn
          hỗ trợ tài chính tới tao - người đang gặp khó khăn về kinh tế trong
          việc tiếp tục học tập và phát triển bản thân.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <Button size='lg' nativeButton={false} render={<Link href='/nuoi' />}>
            Trở thành nhà tài trợ <ChevronRightIcon />
          </Button>
          <Button
            size='lg'
            variant='secondary'
            nativeButton={false}
            render={<Link href='/sao-ke' />}
          >
            Xem sao kê
          </Button>
        </div>
      </section>

      <section className='container grid md:grid-cols-2 gap-12'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <p className='text-primary text-sm tracking-wide uppercase font-medium'>
              Tại sao mày nên nuôi tao
            </p>
            <h2 className='text-4xl font-bold text-accent-foreground'>
              Vì nuôi tao là đầu tư cho tương lai
            </h2>
          </div>

          <ul className='space-y-2 text-foreground/80 list-disc pl-6'>
            {reasons.map((reason, idx) => (
              <li key={idx} className='leading-relaxed text-pretty'>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <section className='grid grid-cols-2 gap-4'>
          <h3 className='sr-only'>Reasons to sponsor</h3>

          {why.map((item, idx) => (
            <Card
              key={idx}
              className='hover:bg-accent/20 hover:ring-accent transition-colors'
            >
              <CardHeader>
                <item.icon className='w-8 h-8 text-primary' />
                <h3 className='font-semibold text-foreground'>{item.title}</h3>
                <p className='text-sm text-foreground/70'>{item.description}</p>
              </CardHeader>
            </Card>
          ))}
        </section>
      </section>

      <section className='container'>
        <p className='text-primary text-sm tracking-wide uppercase font-medium mb-2'>
          Cam kết của tao với nhà tài trợ
        </p>
        <h2 className='text-4xl font-bold text-accent-foreground mb-6'>
          Mày nuôi tao, tao hứa với mày (thề luôn)
        </h2>

        <ul className='space-y-4 list-disc pl-6 text-foreground/80'>
          {commits.map((commit, idx) => (
            <li key={idx} className='leading-relaxed text-pretty'>
              {commit}
            </li>
          ))}
        </ul>
      </section>

      <section className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <h2 className='col-span-full text-4xl font-bold text-accent-foreground'>
          Những thằng đang cần mày nuôi
        </h2>

        {peoples.map((person) => (
          <Card
            key={person.id}
            className='hover:bg-accent/20 hover:ring-accent transition-colors'
          >
            <CardHeader className='flex flex-col gap-2 items-center'>
              <CardTitle className='font-serif text-primary font-bold'>
                Nuôi Tao
              </CardTitle>
              <Suspense fallback={<div>Loading year...</div>}>
                <Year />
              </Suspense>
              <Image
                src={person.image}
                alt={`Portrait of ${person.name}`}
                width={200}
                height={200}
                className='rounded-full object-cover ring-2 mt-2 ring-ring ring-offset-2 ring-offset-card'
              />
            </CardHeader>

            <CardContent className='flex flex-col gap-2 items-center'>
              <p className='font-medium'>{person.id}</p>
              <p className='font-serif text-2xl font-bold'>{person.name}</p>
              <p className='text-lg text-muted-foreground'>
                {person.situation}
              </p>
            </CardContent>

            <CardFooter>
              <Button
                className='w-full'
                nativeButton={false}
                render={<Link href='/nuoi' />}
              >
                Nuôi
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}
