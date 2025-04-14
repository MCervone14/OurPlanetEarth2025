import SignInForm from '@/components/features/auth/sign-in'

export const metadata = {
  title: 'Sign-in | Our Planet Earth',
  description: 'Sign-in to your Our Planet Earth account',
}

const LoginPage = async () => {
  return (
    <div className="flex flex-col justify-center">
      <SignInForm />
    </div>
  )
}

export default LoginPage
