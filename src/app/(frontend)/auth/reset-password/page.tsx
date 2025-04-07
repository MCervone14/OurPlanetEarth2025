import { ResetPass } from '@/components/features/auth/reset-password'
import Image from 'next/image'
import { AuthCard } from '@/components/features/auth/auth-card'

const ResetPage = async () => {
  return (
    <div>
      <div className="mx-auto w-full max-w-7xl  self-center px-4 sm:px-0">
        <div className="flex justify-around w-full">
          <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
            <Image
              src="/uploads/mark-harpur-forget-password-photo.jpg"
              blurDataURL={'/uploads/mark-harpur-forget-password-photo.jpg'}
              alt="beautiful lake with mountains in the background"
              fill
              className="object-cover"
            />
          </div>
          <AuthCard view="resetPassword" className="rounded-none" redirectTo="/auth/sign-in" />
          <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
            <Image
              src="/uploads/aniket-deole-forget-password-photo.jpg"
              blurDataURL={'/uploads/aniket-deole-forget-password-photo.jpg'}
              alt="beautiful mountains with a valley in middle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPage
