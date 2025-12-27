import type { history } from '@/app/api/sepay/route.data'

import { cacheLife, cacheTag } from 'next/cache'

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

export default async function SaoKePage() {
  'use cache'
  cacheTag('sepay-history')
  cacheLife({
    stale: 3600, // 1 hour
    revalidate: 86400, // 24 hours
    expire: 604800, // 7 days
  })

  const res = await fetch(`${getBaseUrl()}/api/sepay`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Apikey ${process.env.SEPAY_TOKEN}`,
    },
  })
  if (!res.ok)
    return (
      <main className='container flex-1 py-12'>Lỗi tải lịch sử giao dịch</main>
    )

  const data = (await res.json()) as { history: history }

  return (
    <main className='flex-1 container py-12'>
      <h1 className='mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>
        Sao kê giao dịch
      </h1>

      <section className='ring-foreground/10 bg-card text-card-foreground gap-4 overflow-hidden rounded-xl py-4 px-4 text-sm ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col'>
        <h2 className='sr-only'>Transaction History section</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>Cổng thanh toán</TableHead>
              <TableHead>Số tài khoản</TableHead>
              <TableHead>Số tiền chuyển</TableHead>
              <TableHead className='text-end'>Ngày giao dịch</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.history.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.gateway}</TableCell>
                <TableCell>{transaction.accountNumber}</TableCell>
                <TableCell>
                  {transaction.transferAmount.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </TableCell>
                <TableCell className='text-end'>
                  {new Date(transaction.transactionDate).toLocaleString(
                    'vi-VN',
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                Tổng số giao dịch: {data.history.length}
              </TableCell>
              <TableCell colSpan={2} className='text-end'>
                Tổng số tiền chuyển:{' '}
                {data.history
                  .reduce(
                    (total, transaction) => total + transaction.transferAmount,
                    0,
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
