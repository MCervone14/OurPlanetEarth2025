'use client'
import type React from 'react'

import { toast } from 'sonner'
import type { AuthClient } from '@/types/auth-client'
import { type AuthLocalization, authLocalization } from '@/lib/auth-localization'
import { type AuthViewPaths, authViewPaths } from '@/lib/auth-view-paths'
import type { AuthMutators } from '@/types/auth-mutates'
import type { AdditionalFields } from '@/types/additional-fields'
import type { AuthHooks } from '@/types/auth-hooks'
import type { SocialProvider } from '@/lib/social-providers'
import type { Link } from '@/types/link'
import { useAuthData } from '@/hooks/use-auth-data'
import { type ReactNode, createContext } from 'react'
import { AnyAuthClient } from '@/types/any-auth-client'
import { User } from 'better-auth'

const DefaultLink = ({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) => (
  <a className={className} href={href}>
    {children}
  </a>
)

const defaultNavigate = (href: string) => {
  window.location.href = href
}

const defaultReplace = (href: string) => {
  window.location.replace(href)
}

type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning'
export type RenderToast = ({
  variant,
  message,
}: {
  variant?: ToastVariant
  message: string
}) => void

const defaultToast: RenderToast = ({ variant = 'default', message }) => {
  if (variant === 'default') {
    toast(message)
  } else {
    toast[variant](message)
  }
}

export type AuthUIContextType = {
  authClient: AnyAuthClient
  /**
   * Additional fields for users
   */
  additionalFields?: AdditionalFields
  /**
   * Enable or disable avatar support
   * @default false
   */
  avatar?: boolean
  /**
   * File extension for avatar uploads
   * @default "png"
   */
  avatarExtension: string
  /**
   * Avatars are resized to 128px unless uploadAvatar is provided, then 256px
   * @default 128 | 256
   */
  avatarSize: number
  /**
   * Base path for the auth views
   * @default "/auth"
   */
  basePath: string
  /**
   * Force color icons for both light and dark themes
   * @default false
   */
  colorIcons?: boolean
  /**
   * Enable or disable confirm password input
   * @default false
   */
  confirmPassword?: boolean
  /**
   * Enable or disable credentials support
   * @default true
   */

  credentials?: boolean
  /**
   * Default redirect path after sign in
   * @default "/"
   */
  redirectTo: string
  /**
   * Enable or disable email verification for account deletion
   * @default false
   */
  deleteAccountVerification?: boolean
  /**
   * Enable or disable user account deletion
   * @default false
   */
  deleteUser?: boolean
  /**
   * Show verify email card for unverified emails
   */
  emailVerification?: boolean
  /**
   * Enable or disable forgot password support
   * @default false
   */
  forgetPassword?: boolean
  /**
   * Freshness age for session data
   * @default 60 * 60 * 24
   */
  freshAge: number
  /**
   * @internal
   */
  hooks: AuthHooks
  localization: AuthLocalization
  /**
   * Enable or disable magic link support
   * @default false
   */
  magicLink?: boolean
  /**
   * Enable or disable multi-session support
   * @default false
   */
  multiSession?: boolean
  /** @internal */
  mutators: AuthMutators
  /**
   * Enable or disable name requirement for sign up
   * @default true
   */
  nameRequired?: boolean
  /**
   * Force black & white icons for both light and dark themes
   * @default false
   */
  noColorIcons?: boolean
  /**
   * Perform some user updates optimistically
   * @default false
   */
  optimistic?: boolean
  /**
   * Enable or disable passkey support
   * @default false
   */
  passkey?: boolean
  /**
   * Enable or disable persisting the client with better-auth-tanstack
   * @default false
   */
  persistClient?: boolean
  /**
   * Array of social providers to enable
   * @remarks `SocialProvider[]`
   */
  providers?: SocialProvider[]
  /**
   * Custom OAuth Providers
   * @default false
   */
  otherProviders?: SocialProvider[]
  /**
   * Enable or disable remember me support
   * @default false
   */
  rememberMe?: boolean
  /**
   * Array of fields to show in `<SettingsCards />`
   * @default ["name"]
   */
  settingsFields?: string[]
  /**
   * Custom settings URL
   */
  settingsUrl?: string
  /**
   * Enable or disable sign up support
   * @default true
   */
  signUp?: boolean
  /**
   * Array of fields to show in Sign Up form
   * @default ["name"]
   */
  signUpFields?: string[]
  toast: RenderToast
  /**
   * Enable or disable username support
   * @default false
   */
  user?: Omit<User, 'createdAt' | 'updatedAt'>
  /**
   * Enable or disable username support
   * @default false
   */
  username?: boolean
  viewPaths: AuthViewPaths
  /**
   * Navigate to a new URL
   * @default window.location.href
   */
  navigate: typeof defaultNavigate
  /**
   * Called whenever the session changes
   */
  onSessionChange?: () => void | Promise<void>
  /**
   * Replace the current URL
   * @default navigate
   */
  replace: typeof defaultReplace
  /**
   * Upload an avatar image and return the URL string
   * @remarks `(file: File) => Promise<string>`
   */
  uploadAvatar?: (file: File) => Promise<string | undefined | null>
  /**
   * Custom link component for navigation
   * @default <a>
   */
  Link: Link
}

export type AuthUIProviderProps = {
  /**
   * Your better-auth createAuthClient
   * @default Required
   * @remarks `AuthClient`
   */
  children: ReactNode
  /**
   * Your better-auth createAuthClient
   * @default Required
   * @remarks `AuthClient`
   */
  authClient: AnyAuthClient
  /**
   * Customize the paths for the auth views
   * @default authViewPaths
   * @remarks `AuthViewPaths`
   */
  viewPaths?: Partial<AuthViewPaths>
  /**
   * Render custom toasts
   * @default Sonner
   */
  toast?: RenderToast
  /**
   * Customize the localization strings
   * @default authLocalization
   * @remarks `AuthLocalization`
   */
  localization?: AuthLocalization
  /** @internal */
  mutates?: AuthMutators
} & Partial<Omit<AuthUIContextType, 'viewPaths' | 'localization' | 'mutates' | 'toast'>>

export const AuthUIContext = createContext<AuthUIContextType>({} as unknown as AuthUIContextType)

export const AuthUIProvider = ({
  children,
  authClient,
  avatarExtension = 'png',
  avatarSize,
  basePath = '/auth',
  redirectTo = '/',
  credentials = true,
  forgetPassword = true,
  freshAge = 60 * 60 * 24,
  hooks,
  mutators,
  localization,
  nameRequired = true,
  settingsFields = ['name'],
  signUp = true,
  signUpFields = ['name'],
  toast = defaultToast,
  viewPaths,
  navigate,
  replace,
  uploadAvatar,
  Link = DefaultLink,
  ...props
}: {
  children: ReactNode
} & AuthUIProviderProps) => {
  const defaultMutates: AuthMutators = {
    deletePasskey: (params) =>
      (authClient as AuthClient).passkey.deletePasskey({
        ...params,
        fetchOptions: { throw: true },
      }),
    revokeDeviceSession: (params) =>
      (authClient as AuthClient).multiSession.revoke({
        ...params,
        fetchOptions: { throw: true },
      }),
    revokeSession: (params) =>
      (authClient as AuthClient).revokeSession({
        ...params,
        fetchOptions: { throw: true },
      }),
    setActiveSession: (params) =>
      (authClient as AuthClient).multiSession.setActive({
        ...params,
        fetchOptions: { throw: true },
      }),
    updateUser: (params) =>
      authClient.updateUser({
        ...params,
        fetchOptions: { throw: true },
      }),
    unlinkAccount: (params) =>
      authClient.unlinkAccount({
        ...params,
        fetchOptions: { throw: true },
      }),
  }

  const defaultHooks: AuthHooks = {
    useSession: authClient.useSession,
    useListAccounts: () => useAuthData({ queryFn: authClient.listAccounts }),
    useListDeviceSessions: () =>
      useAuthData({ queryFn: (authClient as AuthClient).multiSession.listDeviceSessions }),
    useListSessions: () => useAuthData({ queryFn: authClient.listSessions }),
    useListPasskeys: (authClient as AuthClient).useListPasskeys,
  }

  return (
    <AuthUIContext.Provider
      value={{
        authClient,
        avatarExtension,
        avatarSize: avatarSize || (uploadAvatar ? 256 : 128),
        basePath: basePath === '/' ? '' : basePath,
        redirectTo,
        credentials,
        forgetPassword,
        freshAge,
        hooks: { ...defaultHooks, ...hooks },
        mutators: { ...defaultMutates, ...mutators },
        localization: { ...authLocalization, ...localization },
        nameRequired,
        settingsFields,
        signUp,
        signUpFields,
        toast,
        navigate: navigate || defaultNavigate,
        replace: replace || navigate || defaultReplace,
        viewPaths: { ...authViewPaths, ...viewPaths },
        uploadAvatar,
        Link,
        ...props,
      }}
    >
      {children}
    </AuthUIContext.Provider>
  )
}
