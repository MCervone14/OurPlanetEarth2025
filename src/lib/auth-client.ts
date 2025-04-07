import { createAuthClient } from 'better-auth/react'
import {
  organizationClient,
  passkeyClient,
  twoFactorClient,
  adminClient,
  multiSessionClient,
  anonymousClient,
  phoneNumberClient,
  magicLinkClient,
  emailOTPClient,
  apiKeyClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins'
import { toast } from 'sonner'
import { resetPassword } from 'better-auth/api'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:5000',
  // baseURL: `${process.env.BETTER_AUTH_URL}`, // the base url of your auth server
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/two-factor'
      },
    }),
    anonymousClient(),
    phoneNumberClient(),
    magicLinkClient(),
    emailOTPClient(),
    passkeyClient(),
    adminClient(),
    apiKeyClient(),
    organizationClient(),
    multiSessionClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error('Too many requests. Please try again later.')
      }
    },
  },
})

export const {
  signUp,
  forgetPassword,
  signIn,
  signOut,
  useSession,
  getSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
} = authClient

authClient.$store.listen('$sessionSignal', async () => {})
