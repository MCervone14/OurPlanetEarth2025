import { RedirectToSignIn } from '@/components/features/auth/redirect-to-sign-in'
import { SignedIn } from '@/components/features/auth/signed-in'
import { SettingsCards } from '@/components/features/cards/full-profile-cards'
import { SignedOut } from '@/components/features/auth/signed-out'

const ProfilePage = () => {
  return (
    <div className="flex justify-center">
      <RedirectToSignIn />
      <SignedIn>
        <SettingsCards />
      </SignedIn>
      <SignedOut>Login to your account to gain access.</SignedOut>
    </div>
  )
}

export default ProfilePage
