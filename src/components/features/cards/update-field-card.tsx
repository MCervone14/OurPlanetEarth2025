'use client'

import { type ReactNode, useContext } from 'react'

import type { AuthLocalization } from '@/lib/auth-localization'
import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'

import type { FieldType } from '@/types/additional-fields'
import { SettingsCard, type SettingsCardClassNames } from './settings-card'

export function UpdateFieldCard({
  className,
  classNames,
  defaultValue,
  description,
  instructions,
  isPending,
  localization,
  field,
  placeholder,
  required,
  label,
  type,
  validate,
}: {
  className?: string
  classNames?: SettingsCardClassNames
  defaultValue?: unknown
  description?: ReactNode
  instructions?: ReactNode
  isPending?: boolean
  localization?: Partial<AuthLocalization>
  field: string
  placeholder?: string
  required?: boolean
  label?: ReactNode
  type?: FieldType
  validate?: (value: string) => boolean | Promise<boolean>
}) {
  const {
    hooks: { useSession },
    mutators: { updateUser },
    localization: authLocalization,
  } = useContext(AuthUIContext)

  localization = { ...authLocalization, ...localization }

  const { isPending: sessionPending } = useSession()

  const formAction = async (formData: FormData) => {
    const value = (formData.get(field) as string) || ''

    if (value === defaultValue) return {}

    if (validate && !validate(value)) {
      return {
        error: { message: `${localization.failedToValidate} ${field}` },
      }
    }

    await updateUser({
      [field]:
        type === 'number' ? Number.parseFloat(value) : type === 'boolean' ? value === 'on' : value,
    })
  }

  return (
    <SettingsCard
      key={`${defaultValue}`}
      className={className}
      classNames={classNames}
      defaultValue={defaultValue}
      description={description}
      field={field}
      //@ts-expect-error have to look into the error type mismatch
      formAction={formAction}
      instructions={instructions}
      isPending={isPending || sessionPending}
      label={label}
      localization={localization}
      placeholder={placeholder}
      required={required}
      type={type}
    />
  )
}
