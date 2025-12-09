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

export const history: Pick<
  SepayTransaction,
  'id' | 'gateway' | 'accountNumber' | 'transferAmount' | 'transactionDate'
>[] = []
