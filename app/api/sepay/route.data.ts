export interface SepayTransaction {
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

export interface Transaction {
  id: number
  gateway: string
  account_number: string
  transfer_amount: number
  transaction_date: string
}
