import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import type { SepayTransaction } from '@/app/api/sepay/route.data'

import { createClient } from 'redis'

const client = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
})

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  await client.connect()
  const res = await client.lRange('sepay_history', 0, -1)
  const history = res.map((item) => JSON.parse(item))

  history.sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime(),
  )

  return NextResponse.json({ history }, { status: 200 })
}

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  await client.connect()

  const body = (await req.json()) as SepayTransaction
  console.log('Received Sepay transaction:', body)

  await client.rPush(
    'sepay_history',
    JSON.stringify({
      id: body.id,
      gateway: body.gateway,
      accountNumber: body.accountNumber.slice(0, -4) + '****',
      transferAmount: body.transferAmount,
      transactionDate: body.transactionDate,
    }),
  )

  revalidateTag('sepay-history', 'max')
  return NextResponse.json({ message: 'Transaction received' }, { status: 200 })
}
