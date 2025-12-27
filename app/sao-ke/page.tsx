import type { history } from '@/app/api/sepay/route.data'

import { cacheLife, cacheTag } from 'next/cache'

import {
  Table,
  TableBody,
  TableCell,
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
  if (!res.ok) return <div>Lỗi tải lịch sử giao dịch</div>

  const data = (await res.json()) as { history: history }

  return (
    <main className='flex-1 container py-4'>
      <h1 className='text-3xl font-bold'>Sao kê giao dịch</h1>

      <section className='bg-card p-6 text-card-foreground rounded-xl mt-6 shadow-sm dark:border'>
        <h2 className='sr-only'>Transaction History section</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>Cổng thanh toán</TableHead>
              <TableHead>Số tài khoản</TableHead>
              <TableHead>Số tiền chuyển</TableHead>
              <TableHead>Ngày giao dịch</TableHead>
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
                <TableCell>
                  {new Date(transaction.transactionDate).toLocaleString(
                    'vi-VN',
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}
