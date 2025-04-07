import { AuthCard } from '@/components/features/auth/auth-card'
import Image from 'next/image'

const SignInForm = async () => {
  return (
    <div className="mx-auto w-full max-w-7xl  self-center px-4 sm:px-0">
      <div className="flex justify-around w-full">
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/Grass.jpg"
            blurDataURL={'/uploads/Grass.jpg'}
            alt="Grass"
            fill
            className="object-cover"
          />
        </div>
        <AuthCard view="signIn" className="rounded-none" redirectTo="/" />
        <div className="hidden sm:block w-1/2 h-[calc(100% - 500px)] relative z-10">
          <Image
            src="/uploads/CrackedEarth.jpg"
            blurDataURL={'/uploads/CrackedEarth.jpg'}
            alt="Cracked Earth"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </div>
  )
}

export default SignInForm
