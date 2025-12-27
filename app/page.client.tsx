'use client'
import { CardDescription } from '@/components/ui/card'

export const Year: React.FC = () => (
  <CardDescription>
    Năm học {new Date().getFullYear()} - {new Date().getFullYear() + 1}
  </CardDescription>
)
