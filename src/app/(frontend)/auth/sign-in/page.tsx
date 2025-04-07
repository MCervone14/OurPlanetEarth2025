import { LoginModal } from '@/components/features/auth/LoginModal'
import SignInForm from '@/components/features/auth/sign-in'

const LoginPage = async () => {
  return (
    <div className="flex flex-col justify-center">
      <SignInForm />
    </div>
  )
}

export default LoginPage
