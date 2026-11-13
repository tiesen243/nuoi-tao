import type { NextRequest } from 'next/server'

import { getCloudflareContext } from '@opennextjs/cloudflare'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import type { SepayTransaction } from '@/app/api/sepay/route.data'

export const GET = async (req: NextRequest) => {
  const { env } = await getCloudflareContext({ async: true })

  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const transactions = await env.DB.prepare(`SELECT
      id, gateway, account_number, transfer_amount, content, transaction_date
      FROM transactions
      ORDER BY datetime(transaction_date) DESC`).run()

  return NextResponse.json(
    {
      message: 'Transactions retrieved successfully',
      transactions: transactions.results,
    },
    { status: 200 }
  )
}

export const POST = async (req: NextRequest) => {
  const { env } = await getCloudflareContext({ async: true })

  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = (await req.json()) as SepayTransaction
  if (!body || !body.id)
    return NextResponse.json(
      { message: 'Invalid transaction data' },
      { status: 400 }
    )

  await env.DB.prepare(`INSERT INTO transactions (
      id,
      gateway,
      transaction_date,
      account_number,
      code,
      content,
      transfer_type,
      transfer_amount,
      accumulated,
      sub_account,
      reference_code,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      body.id,
      body.gateway,
      body.transactionDate,
      body.accountNumber,
      body.code,
      body.content.split('TKPYKN').pop()?.trim() ?? '',
      body.transferType,
      body.transferAmount,
      body.accumulated,
      body.subAccount,
      body.referenceCode,
      body.description
    )
    .run()

  revalidateTag('sepay-transactions', 'max')
  return NextResponse.json(
    { message: 'Transaction received', body },
    { status: 200 }
  )
}
