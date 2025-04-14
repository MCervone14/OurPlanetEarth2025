import SignUpForm from '@/components/features/auth/sign-up'

export const metadata = {
  title: 'Sign-up | Our Planet Earth',
  description: 'Sign-up for an Our Planet Earth account',
}

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <SignUpForm />
    </div>
  )
}

export default RegisterPage
