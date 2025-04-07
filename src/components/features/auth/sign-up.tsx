import { AuthCard } from '@/components/features/auth/auth-card'
import Image from 'next/image'

const SignUpForm = async () => {
  return (
    <div className="mx-auto w-full max-w-7xl  self-center px-4 sm:px-0">
      <div className="flex justify-around w-full">
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/wind.jpg"
            blurDataURL={'/uploads/wind.jpg'}
            alt="Wind Turbines"
            fill
            className="object-cover"
          />
        </div>
        <AuthCard view="signUp" className="rounded-none" redirectTo="/" />
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/solar.jpg"
            blurDataURL={'/uploads/solar.jpg'}
            alt="Solar panels"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
