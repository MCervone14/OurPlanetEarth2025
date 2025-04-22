'use client'

import type { Session, User } from 'better-auth'
import { UserIcon } from 'lucide-react'
import { useContext } from 'react'

import { useAuthenticate } from '@/hooks/use-authenticate'
import type { AuthLocalization } from '@/lib/auth-localization'
import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChangePasswordCard } from './change-password-card'
import { DeleteAccountCard } from './delete-account-card'
import type { SettingsCardClassNames } from '@/types/settings-card'
import { UpdateFieldCard } from '@/components/features/cards/update-field-card'
import { UpdateAvatarCard } from './update-avatar-card'
import { UpdateNameCard } from './update-name-card'

export type SettingsCardsClassNames = {
  base?: string
  card?: SettingsCardClassNames
  tabs?: {
    base?: string
    list?: string
    trigger?: string
    content?: string
  }
}

export interface SettingsCardsProps {
  className?: string
  classNames?: SettingsCardsClassNames
  localization?: AuthLocalization
}

export function SettingsCards({ className, classNames, localization }: SettingsCardsProps) {
  useAuthenticate()

  const {
    additionalFields,
    avatar,
    credentials,
    deleteUser,
    hooks,
    localization: authLocalization,
    multiSession,
    nameRequired,
    passkey,
    settingsFields,
  } = useContext(AuthUIContext)

  localization = { ...authLocalization, ...localization }

  const { useListAccounts, useListDeviceSessions, useListPasskeys, useListSessions, useSession } =
    hooks
  const { data: sessionData, isPending: sessionPending } = useSession()

  const { data: accounts, isPending: accountsPending, refetch: refetchAccounts } = useListAccounts()

  const credentialsLinked = accounts?.some((acc) => acc.provider === 'credential')

  const { data: sessions, isPending: sessionsPending, refetch: refetchSessions } = useListSessions()

  let passkeys: { id: string; createdAt: Date }[] | undefined | null = undefined
  let passkeysPending: boolean | undefined = undefined
  let refetchPasskeys: (() => Promise<void>) | undefined = undefined

  if (passkey) {
    const result = useListPasskeys()
    passkeys = result.data
    passkeysPending = result.isPending
    refetchPasskeys = result.refetch
  }

  let deviceSessions: { user: User; session: Session }[] | undefined | null = undefined
  let deviceSessionsPending: boolean | undefined = undefined
  let refetchDeviceSessions: (() => Promise<void>) | undefined = undefined

  if (multiSession) {
    const result = useListDeviceSessions()
    deviceSessions = result.data
    deviceSessionsPending = result.isPending
    refetchDeviceSessions = result.refetch
  }

  return (
    <div
      className={cn(
        'flex w-full max-w-xl grow flex-col items-center gap-4',
        className,
        classNames?.base,
      )}
    >
      <Tabs
        defaultValue="account"
        className={cn('flex w-full flex-col gap-4', classNames?.tabs?.base)}
      >
        <TabsList className={cn('w-full', classNames?.tabs?.list)}>
          <TabsTrigger value="account" className={classNames?.tabs?.trigger}>
            <UserIcon />

            {localization.account}
          </TabsTrigger>

          {/*<TabsTrigger value="security" className={classNames?.tabs?.trigger}>*/}
          {/*  <KeyIcon />*/}

          {/*  {localization.security}*/}
          {/*</TabsTrigger>*/}
        </TabsList>

        <TabsContent
          value="account"
          className={cn('flex flex-col gap-4', classNames?.tabs?.content)}
        >
          {avatar && (
            <UpdateAvatarCard
              classNames={classNames?.card}
              isPending={sessionPending}
              localization={localization}
            />
          )}

          {/*{username && (*/}
          {/*    <UpdateUsernameCard*/}
          {/*        classNames={classNames?.card}*/}
          {/*        isPending={sessionPending}*/}
          {/*        localization={localization}*/}
          {/*    />*/}
          {/*)}*/}

          {(settingsFields?.includes('name') || nameRequired) && (
            <UpdateNameCard
              classNames={classNames?.card}
              isPending={sessionPending}
              localization={localization}
            />
          )}

          {/*{changeEmail && (*/}
          {/*    <ChangeEmailCard*/}
          {/*        classNames={classNames?.card}*/}
          {/*        isPending={sessionPending}*/}
          {/*        localization={localization}*/}
          {/*    />*/}
          {/*)}*/}

          {settingsFields?.map((field) => {
            const additionalField = additionalFields?.[field]
            if (!additionalField) return null

            const { label, description, instructions, placeholder, required, type, validate } =
              additionalField

            // @ts-ignore Custom fields are not typed
            const defaultValue = sessionData?.user[field] as unknown

            return (
              <UpdateFieldCard
                key={field}
                classNames={classNames?.card}
                defaultValue={defaultValue}
                description={description}
                field={field}
                instructions={instructions}
                isPending={sessionPending}
                label={label}
                localization={localization}
                placeholder={placeholder}
                required={required}
                type={type}
                validate={validate}
              />
            )
          })}

          {/*{multiSession && (*/}
          {/*    <AccountsCard*/}
          {/*        classNames={classNames?.card}*/}
          {/*        deviceSessions={deviceSessions}*/}
          {/*        isPending={deviceSessionsPending}*/}
          {/*        localization={localization}*/}
          {/*        refetch={refetchDeviceSessions}*/}
          {/*        skipHook*/}
          {/*    />*/}
          {/*)}*/}

          {credentials && (
            <ChangePasswordCard
              accounts={accounts}
              classNames={classNames?.card}
              isPending={sessionPending}
              localization={localization}
              skipHook
            />
          )}

          {deleteUser && (
            <DeleteAccountCard
              accounts={accounts}
              classNames={classNames?.card}
              isPending={sessionPending}
              localization={localization}
              skipHook
            />
          )}
        </TabsContent>

        <TabsContent
          value="security"
          className={cn('flex flex-col gap-4', classNames?.tabs?.content)}
        >
          {/*{(providers?.length || otherProviders?.length) && (*/}
          {/*    <ProvidersCard*/}
          {/*        accounts={accounts}*/}
          {/*        classNames={classNames?.card}*/}
          {/*        isPending={accountsPending}*/}
          {/*        localization={localization}*/}
          {/*        refetch={refetchAccounts}*/}
          {/*        skipHook*/}
          {/*    />*/}
          {/*)}*/}

          {/*{passkey && (*/}
          {/*    <PasskeysCard*/}
          {/*        classNames={classNames?.card}*/}
          {/*        isPending={passkeysPending}*/}
          {/*        localization={localization}*/}
          {/*        passkeys={passkeys}*/}
          {/*        refetch={refetchPasskeys}*/}
          {/*        skipHook*/}
          {/*    />*/}
          {/*)}*/}

          {/*{twoFactor && credentialsLinked && (*/}
          {/*    <TwoFactorCard classNames={classNames?.card} localization={localization} />*/}
          {/*)}*/}

          {/*<SessionsCard*/}
          {/*    classNames={classNames?.card}*/}
          {/*    isPending={sessionsPending}*/}
          {/*    localization={localization}*/}
          {/*    sessions={sessions}*/}
          {/*    refetch={refetchSessions}*/}
          {/*    skipHook*/}
          {/*/>*/}
        </TabsContent>
      </Tabs>
    </div>
  )
}
