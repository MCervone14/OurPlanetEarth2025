'use client'

import { useAuthenticate } from '@/hooks/use-authenticate'

export function RedirectToSignIn() {
  useAuthenticate({ authView: 'signIn' })
  return null
}
