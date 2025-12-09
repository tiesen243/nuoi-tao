import fs from 'node:fs/promises'
import path from 'node:path'

import type { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const HISTORY_FILE = path.resolve(process.cwd(), 'sepay-history.json')

type HistoryRecord = Pick<
  SepayTransaction,
  'id' | 'gateway' | 'accountNumber' | 'transferAmount' | 'transactionDate'
>[]

async function loadHistory(): Promise<HistoryRecord> {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveHistory(history: HistoryRecord): Promise<void> {
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8')
}

let history: HistoryRecord = []

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  history = await loadHistory()
  return NextResponse.json({ history }, { status: 200 })
}

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_TOKEN)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = (await req.json()) as SepayTransaction
  console.log('Received Sepay transaction:', body)

  history = await loadHistory()
  history.push({
    id: body.id,
    gateway: body.gateway,
    accountNumber: body.accountNumber.slice(0, -4) + '****',
    transferAmount: body.transferAmount,
    transactionDate: body.transactionDate,
  })

  await saveHistory(history)

  revalidateTag('sepay-history', 'max')
  return NextResponse.json({ message: 'Transaction received' }, { status: 200 })
}

interface SepayTransaction {
  id: number
  gateway: string
  transactionDate: string
  accountNumber: string
  code: string | null
  content: string
  transferType: 'in' | 'out'
  transferAmount: number
  accumulated: number
  subAccount: string | null
  referenceCode: string
  description: string
}
