import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { peoples } from '@/lib/data.json'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1 className='sr-only'>Nuoi Tao Program</h1>

      <section className='flex flex-col items-center gap-4 mb-8 bg-accent text-accent-foreground py-24 px-4'>
        <h2 className='text-7xl text-center font-black from-chart-5 via-chart-4 to-chart-2 w-fit bg-clip-text text-transparent bg-linear-to-br'>
          Nuôi Tao
        </h2>

        <p className='max-w-2xl text-center text-lg'>
          Chương trình nuôi dưỡng, hỗ trợ các bạn học sinh, sinh viên có hoàn
          cảnh khó khăn vươn lên trong học tập.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 mt-4'>
          <Button size='lg' asChild>
            <Link href='/nuoi'>Trở thành nhà tài trợ</Link>
          </Button>
          <Button size='lg' variant='secondary' asChild>
            <Link href='#about'>Tìm hiểu thêm</Link>
          </Button>
        </div>

        <div className='max-w-3xl mt-8 text-center text-base text-muted-foreground'>
          <p>
            Nuôi Tao kết nối những nhà hảo tâm với các bạn học sinh, sinh viên
            tài năng đang gặp khó khăn về tài chính. Cùng nhau, chúng ta trao
            quyền cho thế hệ trẻ thực hiện ước mơ học tập và xây dựng tương lai
            tươi sáng hơn.
          </p>
          <p className='mt-2'>
            Hãy đồng hành cùng chúng tôi để tạo nên sự khác biệt - mỗi đóng góp
            đều giúp mở ra tiềm năng và thay đổi cuộc đời.
          </p>
        </div>
      </section>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container py-12'>
        {peoples.map((person) => (
          <Card key={person.id}>
            <CardHeader className='flex flex-col gap-4 items-center'>
              <CardTitle className='font-serif'>Nuoi Tao</CardTitle>
              <CardDescription>
                Nam hoc {new Date().getFullYear()} -{' '}
                {new Date().getFullYear() + 1}
              </CardDescription>
              <Image
                src={person.image}
                alt={`Portrait of ${person.name}`}
                width={200}
                height={200}
                className='rounded-full object-cover ring-2 ring-ring ring-offset-2 ring-offset-card'
              />
            </CardHeader>

            <CardContent className='flex flex-col gap-2 items-center'>
              <p className='font-medium text-lg'>{person.id}</p>
              <p className='font-serif text-4xl font-bold'>{person.name}</p>
              <p className='text-xl text-muted-foreground'>
                {person.situation}
              </p>
            </CardContent>

            <CardFooter>
              <Button className='w-full' asChild>
                <Link href='/nuoi'>Nuôi</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}
