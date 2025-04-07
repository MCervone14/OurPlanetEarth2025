export const authViewPaths = {
  /** @default "callback" */
  callback: 'callback',
  /** @default "forgot-password" */
  forgetPassword: 'auth/forget-password',
  /** @default "magic-link" */
  magicLink: 'magic-link',
  /** @default "reset-password" */
  resetPassword: 'auth/reset-password',
  /** @default "settings" */
  settings: 'settings',
  /** @default "sign-in" */
  signIn: 'auth/sign-in',
  /** @default "sign-out" */
  signOut: 'sign-out',
  /** @default "sign-up" */
  signUp: 'auth/sign-up',
}

export type AuthViewPaths = typeof authViewPaths

export type AuthView = keyof typeof authViewPaths
