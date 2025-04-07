import type { Session, User } from 'better-auth'
import type { FetchError } from './fetch-error'

type AuthHook<T> = {
  isPending: boolean
  data?: T | null
  error?: FetchError | null
  refetch?: () => Promise<any> | any
}

export type AuthHooks = {
  useSession: () => AuthHook<{ session: Session; user: User }>
  useListAccounts: () => AuthHook<{ accountId: string; provider: string }[]>
  useListDeviceSessions: () => AuthHook<{ session: Session; user: User }[]>
  useListSessions: () => AuthHook<Session[]>
  useListPasskeys: () => AuthHook<{ id: string; createdAt: Date }[]>
  useIsRestoring?: () => boolean
}
