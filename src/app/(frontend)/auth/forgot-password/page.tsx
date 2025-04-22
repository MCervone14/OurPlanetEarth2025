import { AuthCard } from '@/components/features/auth/auth-card'
import Image from 'next/image'

export const metadata = {
  title: 'Forget-Password | Our Planet Earth',
  description: 'Recover your password to your Our Planet Earth account',
}

const ForgetPassPage = async () => {
  return (
    <div className="mx-auto w-full max-w-7xl  self-center px-4 sm:px-0">
      <div className="flex justify-around w-full">
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/lake-scenery.jpg"
            blurDataURL={'/uploads/lake-scenery.jpg'}
            alt="beautiful lake with mountains in the background"
            fill
            className="object-cover"
          />
        </div>
        <AuthCard view="forgotPassword" className="rounded-none" />
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/mountain-scenery.jpg"
            blurDataURL={'/uploads/mountain-scenery.jpg'}
            alt="beautiful mountains with a valley in middle"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default ForgetPassPage
