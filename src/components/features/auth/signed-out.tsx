'use client'

import { type ReactNode, useContext } from 'react'

import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'

export function SignedOut({ children }: { children: ReactNode }) {
  const {
    hooks: { useSession },
  } = useContext(AuthUIContext)
  const { data, isPending } = useSession()

  if (isPending || data) return null

  return <>{children}</>
}
