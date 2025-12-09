import { NextResponse, type NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.split(' ')[1]
  if (apiKey !== process.env.SEPAY_API_KEY)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = (await req.json()) as SepayTransaction
  console.log('Received Sepay transaction:', body)

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
