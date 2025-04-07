import { useContext } from 'react'

import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'

export function useSession() {
  const { authClient } = useContext(AuthUIContext)
  return authClient.useSession()
}
