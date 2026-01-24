import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { Year } from '@/app/page.client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { reasons, why, peoples, commits } from '@/lib/content'

export default function HomePage() {
  return (
    <main className='flex flex-col gap-16 pb-16'>
      <h1 className='sr-only'>Nuoi Tao Program</h1>

      <section className='flex flex-col items-center gap-4 bg-linear-to-br from-accent/40 via-accent-foreground/40 to-accent/40 px-4 py-32'>
        <h2 className='w-fit bg-linear-to-br from-chart-4 via-chart-3 to-chart-2 bg-clip-text text-center text-8xl font-black text-transparent drop-shadow-xl'>
          Nuôi Tao
        </h2>

        <p className='max-w-2xl text-center text-lg drop-shadow-xl'>
          Chương trình nuôi tao là một sáng kiến nhằm kết nối những người muốn
          hỗ trợ tài chính tới tao - người đang gặp khó khăn về kinh tế trong
          việc tiếp tục học tập và phát triển bản thân.
        </p>

        <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
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

      <section className='container grid gap-12 md:grid-cols-2'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <p className='text-sm font-medium tracking-wide text-primary uppercase'>
              Tại sao mày nên nuôi tao
            </p>
            <h2 className='text-4xl font-bold text-accent-foreground'>
              Vì nuôi tao là đầu tư cho tương lai
            </h2>
          </div>

          <ul className='list-disc space-y-2 pl-6 text-foreground/80'>
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
              className='transition-colors hover:bg-accent/20 hover:ring-accent'
            >
              <CardHeader>
                <item.icon className='h-8 w-8 text-primary' />
                <h3 className='font-semibold text-foreground'>{item.title}</h3>
                <p className='text-sm text-foreground/70'>{item.description}</p>
              </CardHeader>
            </Card>
          ))}
        </section>
      </section>

      <section className='container'>
        <p className='mb-2 text-sm font-medium tracking-wide text-primary uppercase'>
          Cam kết của tao với nhà tài trợ
        </p>
        <h2 className='mb-6 text-4xl font-bold text-accent-foreground'>
          Mày nuôi tao, tao hứa với mày (thề luôn)
        </h2>

        <ul className='list-disc space-y-4 pl-6 text-foreground/80'>
          {commits.map((commit, idx) => (
            <li key={idx} className='leading-relaxed text-pretty'>
              {commit}
            </li>
          ))}
        </ul>
      </section>

      <section className='container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <h2 className='col-span-full text-4xl font-bold text-accent-foreground'>
          Những thằng đang cần mày nuôi
        </h2>

        {peoples.map((person) => (
          <Card
            key={person.id}
            className='transition-colors hover:bg-accent/20 hover:ring-accent'
          >
            <CardHeader className='flex flex-col items-center gap-2'>
              <CardTitle className='font-serif font-bold text-primary'>
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
                className='mt-2 rounded-full object-cover ring-2 ring-ring ring-offset-2 ring-offset-card'
              />
            </CardHeader>

            <CardContent className='flex flex-col items-center gap-2'>
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
