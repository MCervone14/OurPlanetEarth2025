'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'

const LogoutButton = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  return (
    <DropdownMenuItem className="cursor-pointer hover:bg-green-200 rounded-none">
      <Button
        className="w-full hover:bg-none"
        type="submit"
        variant="ghost"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              await signOut()
              router.push('/') // Redirect to home
              router.refresh()
              toast('Successfully Logged Out')
            } catch (e) {
              console.log(e)
            }
          })
        }}
      >
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </DropdownMenuItem>
  )
}

export default LogoutButton
