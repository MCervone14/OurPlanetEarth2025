'use client'

import { useActionState, useContext } from 'react'

import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'
import { getErrorMessage } from '@/lib/get-error-message'
import { cn } from '@/lib/utils'
import { Card } from '../../ui/card'
import { SettingsCardFooter } from './settings-card-footer'
import { SettingsCardHeader } from './settings-card-header'
import { SettingsCardProps } from '@/types/settings-card'

export function SettingsCard({
  children,
  title,
  description,
  instructions,
  actionLabel,
  isSubmitting: externalIsSubmitting,
  disabled,
  isPending,
  className,
  classNames,
  formAction,
  localization,
  optimistic,
  variant = 'default',
}: SettingsCardProps) {
  const { localization: authLocalization, toast } = useContext(AuthUIContext)

  localization = { ...authLocalization, ...localization }

  const performAction = async (_: Record<string, unknown>, formData: FormData) => {
    try {
      await formAction?.(formData)
    } catch (error) {
      toast({
        variant: 'error',
        message: getErrorMessage(error) || localization.requestFailed,
      })
    }

    return {}
  }

  const [action, internalAction, isSubmitting] = useActionState(performAction, {})

  return (
    <form action={internalAction}>
      <Card
        className={cn(
          'w-full pb-0 text-start',
          variant === 'destructive' && 'border-destructive/40',
          className,
          classNames?.base,
        )}
      >
        <SettingsCardHeader
          title={title}
          description={description}
          isPending={isPending}
          classNames={classNames}
        />

        {children}

        <SettingsCardFooter
          actionLabel={actionLabel}
          disabled={disabled}
          isSubmitting={isSubmitting || externalIsSubmitting}
          isPending={isPending}
          instructions={instructions}
          classNames={classNames}
          optimistic={optimistic}
          variant={variant}
        />
      </Card>
    </form>
  )
}
