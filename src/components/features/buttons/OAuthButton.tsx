'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { ReactElement, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ButtonProps {
  company: 'facebook' | 'google' | 'microsoft'
  callbackUrl: string
  Icon: ReactElement<any, any>
}

const OAuthButton = ({ company, callbackUrl, Icon }: ButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          try {
            const { data, error } = await authClient.signIn.social({
              provider: company,
              callbackURL: callbackUrl,
            })

            console.log('data back from google', data, 'error back from google', error)
            toast('Successfully Logged In')
            router.refresh()
          } catch (e) {
            console.log(e)
          }
        })
      }}
      variant="outline"
      className="flex-1 hover:bg-green-200 cursor-pointer admin-social-button capitalize"
    >
      {company} {Icon}
    </Button>
  )
}

export default OAuthButton
