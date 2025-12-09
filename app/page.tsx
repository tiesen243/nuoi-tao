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
    <main className='flex flex-col gap-16 pb-16'>
      <h1 className='sr-only'>Nuoi Tao Program</h1>

      <section className='flex flex-col items-center gap-4 bg-accent text-accent-foreground py-24 px-4'>
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
            <Link href='/sao-ke'>Xem sao kê</Link>
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

      <section className='container'>
        <h2 className='sr-only'>Why you should become a sponsor section</h2>

        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>
              Tại sao mày nên nuôi Tao?
            </CardTitle>
            <CardDescription>
              Lợi ích khi trở thành nhà tài trợ chương trình Nuôi Tao
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className='list-disc pl-6 space-y-2 text-lg'>
              <li>
                Đồng hành cùng tao vượt qua khó khăn để tiếp tục học tập và phát
                triển bản thân.
              </li>
              <li>
                Đóng góp của mày sẽ được sử dụng minh bạch, cập nhật công khai
                từng khoản hỗ trợ.
              </li>
              <li>
                Góp phần xây dựng một cộng đồng nhân ái, lan tỏa giá trị tốt đẹp
                trong xã hội.
              </li>
              <li>
                Kết nối trực tiếp với những hoàn cảnh thực sự cần giúp đỡ, tạo
                động lực cho tao vươn lên.
              </li>
              <li>
                Mỗi sự đóng góp đều là một cơ hội thay đổi cuộc đời cho tao.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className='container'>
        <h2 className='sr-only'>Our commitments to sponsors section</h2>

        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Cam kết</CardTitle>
            <CardDescription>
              Đối với các nhà tài trợ của chương trình Nuôi Tao
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ul className='list-disc pl-6 space-y-2 text-lg'>
              <li>
                Mọi khoản đóng góp đều được sử dụng minh bạch, công khai và đúng
                mục đích hỗ trợ tao.
              </li>
              <li>
                Thông tin về quá trình hỗ trợ, kết quả và sao kê sẽ được cập
                nhật thường xuyên để đảm bảo sự tin tưởng từ cộng đồng.
              </li>
              <li>
                Cam kết bảo vệ quyền riêng tư và tôn trọng thông tin cá nhân của
                tụi mày.
              </li>
              <li>
                Đội ngũ chương trình luôn đéo lắng nghe, tiếp nhận ý kiến đóng
                góp để hoàn thiện và phát triển hoạt động.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className='container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <h2 className='col-span-full text-2xl font-bold'>
          Những người đang cần mày nuôi
        </h2>

        {peoples.map((person) => (
          <Card key={person.id}>
            <CardHeader className='flex flex-col gap-4 items-center'>
              <CardTitle className='font-serif'>Nuôi Tao</CardTitle>
              <CardDescription>Nam hoc 2025 - 2026</CardDescription>
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
