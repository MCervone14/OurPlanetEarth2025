import type { Account, DeviceSession } from '@/lib/auth-types'
import { getPayload } from '@/lib/getPayload'
import { headers as requestHeaders } from 'next/headers'

export const getSession = async () => {
  const payload = await getPayload()
  const headers = await requestHeaders()
  return await payload.betterAuth.api.getSession({ headers })
}

export const getUserAccounts = async (): Promise<Account[]> => {
  const payload = await getPayload()
  const headers = await requestHeaders()
  return await payload.betterAuth.api.listUserAccounts({ headers })
}

export const getDeviceSessions = async (): Promise<DeviceSession[]> => {
  const payload = await getPayload()
  const headers = await requestHeaders()
  return await payload.betterAuth.api.listDeviceSessions({ headers })
}

export const currentUser = async () => {
  const payload = await getPayload()
  const headers = await requestHeaders()
  const { user } = await payload.auth({ headers })
  return user
}

export const getContextProps = () => {
  const sessionPromise = getSession()
  const userAccountsPromise = getUserAccounts()
  const deviceSessionsPromise = getDeviceSessions()
  const currentUserPromise = currentUser()
  return { sessionPromise, userAccountsPromise, deviceSessionsPromise, currentUserPromise }
}
