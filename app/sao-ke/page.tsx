import { getCloudflareContext } from '@opennextjs/cloudflare'
import { unstable_cache } from 'next/cache'

import type { Transaction } from '@/app/api/sepay/route.data'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getBaseUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const fetchData = unstable_cache(
  () => {
    const { env } = getCloudflareContext()

    return fetch(`${getBaseUrl()}/api/sepay`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Apikey ${env.SEPAY_TOKEN}`,
      },
    })
  },
  [],
  {
    revalidate: 7 * 24 * 60 * 60, // Revalidate every 7 days
    tags: ['sepay-transactions'],
  }
)

export default async function SaoKePage() {
  const res = await fetchData()
  if (!res.ok)
    return (
      <main className='container flex-1 py-12'>Lỗi tải lịch sử giao dịch</main>
    )

  const data = (await res.json()) as { transactions: Transaction[] }

  return (
    <main className='container flex-1 py-12'>
      <h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>
        Sao kê giao dịch
      </h1>

      <section className='group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card px-4 py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl'>
        <h2 className='sr-only'>Transaction History section</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>Số tiền chuyển</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead className='text-end'>Ngày giao dịch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {transaction.transfer_amount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </TableCell>
                <TableCell>{transaction.content ?? '-'}</TableCell>
                <TableCell className='text-end'>
                  {new Date(transaction.transaction_date).toLocaleString(
                    'vi-VN'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                Tổng số giao dịch: {data.transactions.length}
              </TableCell>
              <TableCell colSpan={2} className='text-end'>
                Tổng số tiền chuyển:{' '}
                {data.transactions
                  .reduce(
                    (total, transaction) => total + transaction.transfer_amount,
                    0
                  )
                  .toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </main>
  )
}
