import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import type { SepayTransaction } from '@/app/api/sepay/route.data'
import { history } from '@/app/api/sepay/route.data'

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  return NextResponse.json({ history }, { status: 200 })
}

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = (await req.json()) as SepayTransaction
  console.log('Received Sepay transaction:', body)

  history.push({
    id: body.id,
    gateway: body.gateway,
    accountNumber: body.accountNumber.slice(0, -4) + '****',
    transferAmount: body.transferAmount,
    transactionDate: body.transactionDate,
  })

  revalidateTag('sepay-history', 'max')
  return NextResponse.json({ message: 'Transaction received' }, { status: 200 })
}
