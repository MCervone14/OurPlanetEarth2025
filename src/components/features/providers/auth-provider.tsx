'use client'

import { AuthUIProvider } from './auth-ui-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { authClient } from '@/lib/auth-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => {
          router.refresh()
        }}
        magicLink={false}
        providers={['google', 'microsoft', 'facebook']}
        basePath="/"
        Link={Link}
        emailVerification={true}
        credentials={true}
        rememberMe={false}
        deleteUser={true}
        avatar={true}
        username={true}
      >
        {children}
      </AuthUIProvider>
    </QueryClientProvider>
  )
}
