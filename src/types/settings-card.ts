import { ReactNode } from 'react'
import { AuthLocalization } from '@/lib/auth-localization'

export type SettingsCardClassNames = {
  base?: string
  avatar?: UserAvatarClassNames
  button?: string
  cell?: string
  content?: string
  description?: string
  footer?: string
  header?: string
  input?: string
  instructions?: string
  label?: string
  skeleton?: string
  title?: string
}

export interface SettingsCardProps {
  children?: ReactNode
  title: ReactNode
  description?: ReactNode
  instructions?: ReactNode
  actionLabel?: ReactNode
  isSubmitting?: boolean
  disabled?: boolean
  isPending?: boolean
  className?: string
  classNames?: SettingsCardClassNames
  formAction?: (formData: FormData) => Promise<unknown> | Promise<void> | void
  localization?: AuthLocalization
  optimistic?: boolean
  variant?: 'default' | 'destructive'
}

export interface UserAvatarClassNames {
  base?: string
  image?: string
  fallback?: string
  fallbackIcon?: string
  skeleton?: string
}
