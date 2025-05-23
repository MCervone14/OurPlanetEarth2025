'use client'

import { Loader2 } from 'lucide-react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import type { AuthLocalization } from '@/lib/auth-localization'
import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'
import type { AuthView } from '@/lib/auth-view-paths'
import { Provider, socialProviders } from '@/lib/social-providers'
import { cn, isValidEmail } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PasswordInput } from '@/components/features/input/password-input'
import { ActionButton } from '@/components/features/buttons/action-button'
import { MagicLinkButton } from '@/components/features/buttons/magic-link-button'
import { PasskeyButton } from '@/components/features/buttons/passkey-button'
import { ProviderButton } from '@/components/features/buttons/provider-button'

export type AuthFormClassNames = {
  base?: string
  actionButton?: string
  forgotPasswordLink?: string
  input?: string
  label?: string
  description?: string
  providerButton?: string
  secondaryButton?: string
}

export function AuthForm({
  setErrorMessage,
  className,
  classNames,
  callbackURL,
  localization,
  pathname,
  redirectTo,
  socialLayout = 'auto',
  view,
}: {
  className?: string
  classNames?: AuthFormClassNames
  callbackURL?: string
  localization?: Partial<AuthLocalization>
  pathname?: string
  redirectTo?: string
  socialLayout?: 'auto' | 'horizontal' | 'grid' | 'vertical'
  view?: AuthView
  setErrorMessage: (msg: string | null) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({ email: '', password: '', username: '', name: '' })

  const {
    additionalFields,
    authClient,
    basePath,
    confirmPassword: confirmPasswordEnabled,
    redirectTo: defaultRedirectTo,
    credentials,
    forgotPassword,
    hooks: { useIsRestoring, useSession },
    localization: authLocalization,
    magicLink,
    nameRequired,
    navigate,
    passkey,
    persistClient,
    providers,
    rememberMe,
    replace,
    signUp,
    signUpFields,
    toast,
    username: usernamePlugin,
    viewPaths,
    onSessionChange,
    Link,
  } = useContext(AuthUIContext)

  const { data: sessionData, error } = useSession()

  localization = { ...authLocalization, ...localization }

  const isRestoring = useIsRestoring?.()

  const signingOut = useRef(false)
  const isRedirecting = useRef(false)
  const checkingResetPasswordToken = useRef(false)

  if (socialLayout === 'auto') {
    socialLayout = !credentials
      ? 'vertical'
      : providers && providers.length > 3
        ? 'horizontal'
        : 'vertical'
  }

  const path = pathname?.split('/').pop()

  if (path && !Object.values(viewPaths).includes(path)) {
    console.error(`Invalid auth view: ${path}`)
  }

  view =
    view ||
    ((Object.entries(viewPaths).find(([_, value]) => value === path)?.[0] || 'signIn') as AuthView)

  const getRedirectTo = useCallback(
    () =>
      redirectTo ||
      new URLSearchParams(window.location.search).get('redirectTo') ||
      defaultRedirectTo,
    [defaultRedirectTo, redirectTo],
  )

  const getCallbackURL = useCallback(
    () =>
      callbackURL ||
      (persistClient
        ? `${window.location.pathname.replace(viewPaths[view], viewPaths.callback)}?redirectTo=${getRedirectTo()}`
        : getRedirectTo()),
    [callbackURL, persistClient, view, viewPaths, getRedirectTo],
  )

  const successRef = useRef(false)

  const onSuccess = useCallback(() => {
    onSessionChange?.()
    successRef.current = true
    setIsLoading(true)
  }, [onSessionChange])

  useEffect(() => {
    if (!isLoading || !successRef.current) return

    if (error) {
      setIsLoading(false)
      setErrorMessage(error.message! || error.statusText!)
      successRef.current = false
      return
    }

    if (sessionData) {
      navigate(getRedirectTo())
    }
  }, [isLoading, error, navigate, sessionData, getRedirectTo, toast])

  const formAction = async (formData: FormData) => {
    setState({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      username: formData?.get('username') as string,
      name: formData?.get('name') as string,
    })
    const provider = formData.get('provider') as Provider

    if (provider) {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getCallbackURL(),
      })

      if (error) {
        setErrorMessage(error.message || error.statusText)
      } else {
        setState({ email: '', password: '', username: '', name: '' })
        setIsLoading(true)
      }

      return
    }

    const otherProvider = formData.get('otherProvider') as string

    if (otherProvider) {
      // @ts-ignore
      const { error } = await authClient.signIn.oauth2({
        providerId: otherProvider,
        callbackURL: getCallbackURL(),
      })

      if (error) {
        setErrorMessage(error.message || error.statusText)
      } else {
        setIsLoading(true)
      }

      return
    }

    if (formData.get('passkey')) {
      // @ts-expect-error Optional plugin
      const response = await authClient.signIn.passkey()
      const error = response?.error
      if (error) {
        setErrorMessage(error.message || error.statusText)
      } else {
        onSuccess()
        toast({ variant: 'success', message: 'Successfully logged in with Passkey' })
      }

      return
    }

    let email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') || ('' as string)

    switch (view) {
      case 'signIn': {
        if (!credentials) {
          // @ts-expect-error Optional plugin
          const { error } = await authClient.signIn.magicLink({
            email,
            callbackURL: getCallbackURL(),
          })

          if (error) {
            setErrorMessage(error.message || error.statusText)
          } else {
            setErrorMessage(null)
            toast({ variant: 'success', message: localization.magicLinkEmail! })
          }

          return
        }

        const params = {
          password,
          rememberMe: !rememberMe || formData.has('rememberMe'),
        }

        if (usernamePlugin) {
          const username = formData.get('username') as string

          if (isValidEmail(username)) {
            email = username
          } else {
            // @ts-expect-error Optional plugin
            const { error } = await authClient.signIn.username({
              username,
              ...params,
            })

            if (error) {
              setErrorMessage(error.message || error.statusText)
            } else {
              setErrorMessage(null)
              onSuccess()
              toast({ variant: 'success', message: 'Successfully logged in with Username' })
            }

            return
          }
        }

        const { error } = await authClient.signIn.email({
          email,
          ...params,
        })
        if (error) {
          setErrorMessage(error.message || error.statusText)
        } else {
          setErrorMessage(null)
          onSuccess()
          toast({ variant: 'success', message: 'Successfully logged in with Email' })
        }

        break
      }

      case 'magicLink': {
        // @ts-expect-error Optional plugin
        const { error } = await authClient.signIn.magicLink({
          email,
          callbackURL: getCallbackURL(),
        })

        if (error) {
          setErrorMessage(error.message || error.statusText)
        } else {
          toast({ variant: 'success', message: localization.magicLinkEmail! })
        }

        break
      }

      case 'signUp': {
        if (confirmPasswordEnabled) {
          const confirmPassword = formData.get('confirmPassword') as string
          if (password !== confirmPassword) {
            setErrorMessage(localization.passwordsDoNotMatch!)
            return
          }
        }

        const params = {
          email,
          password,
          name,
          callbackURL: getCallbackURL(),
        } as Record<string, unknown>

        if (usernamePlugin) {
          params.username = formData.get('username')
        }

        signUpFields?.map((field) => {
          if (field === 'name') return

          const additionalField = additionalFields?.[field]
          if (!additionalField) return

          if (formData.has(field)) {
            const value = formData.get(field) as string

            if (additionalField.validate && !additionalField.validate(value)) {
              toast({
                variant: 'error',
                message: `${localization.failedToValidate} ${field}`,
              })
              return
            }

            params[field] =
              additionalField.type === 'number'
                ? Number.parseFloat(value)
                : additionalField.type === 'boolean'
                  ? value === 'on'
                  : value
          }
        })

        // @ts-expect-error We omit signUp from the authClient type to support additional fields
        const { data, error } = await authClient.signUp.email(params)

        if (error) {
          setErrorMessage(error.message || error.statusText)
        } else if (data.token) {
          onSuccess()
        } else {
          navigate(`${basePath}/${viewPaths.signIn}`)
          toast({ variant: 'success', message: localization.signUpEmail! })
        }

        break
      }

      case 'forgotPassword': {
        const { error } = await authClient.forgetPassword({
          email: email,
          redirectTo: window.location.pathname.replace(
            viewPaths.forgotPassword,
            viewPaths.resetPassword,
          ),
        })

        if (error) {
          setErrorMessage(error.message || error.statusText)
        } else {
          toast({ variant: 'success', message: localization.forgotPasswordEmail! })
          navigate(`${basePath}/${viewPaths.signIn}`)
        }

        break
      }

      case 'resetPassword': {
        if (confirmPasswordEnabled) {
          const confirmPassword = formData.get('confirmPassword') as string
          if (password !== confirmPassword) {
            setErrorMessage(localization.passwordsDoNotMatch!)
          }
        }

        const searchParams = new URLSearchParams(window.location.search)
        const token = searchParams.get('token') as string

        const { error } = await authClient.resetPassword({
          newPassword: password,
          token,
        })

        if (error) {
          setErrorMessage(error.message || error.statusText)
        } else {
          toast({ variant: 'success', message: localization.resetPasswordSuccess! })
          navigate(`${basePath}/${viewPaths.signIn}`)
        }

        break
      }
    }
  }

  useEffect(() => {
    if (view !== 'signOut') {
      signingOut.current = false
    }

    if (view !== 'callback') {
      isRedirecting.current = false
    }
  }, [view])

  useEffect(() => {
    if (view !== 'signOut' || signingOut.current) return

    signingOut.current = true
    authClient.signOut().finally(async () => {
      replace(`${basePath}/${viewPaths.signIn}`)
      onSessionChange?.()
    })
  }, [view, authClient, basePath, replace, viewPaths.signIn, onSessionChange])

  useEffect(() => {
    if (view !== 'resetPassword' || checkingResetPasswordToken.current) return

    checkingResetPasswordToken.current = true

    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get('token')
    if (!token || token === 'INVALID_TOKEN') {
      navigate(`${basePath}/${viewPaths.signIn}`)
      setTimeout(() => {
        toast({ variant: 'error', message: localization.resetPasswordInvalidToken! })
        checkingResetPasswordToken.current = false
      }, 100)
    }
  }, [basePath, view, viewPaths, navigate, localization, toast])

  useEffect(() => {
    if (view === 'magicLink' && !magicLink) {
      replace(`${basePath}/${viewPaths.signIn}`)
    }

    if (view === 'signUp' && !signUp) {
      replace(`${basePath}/${viewPaths.signIn}`)
    }

    if (['signUp', 'forgetPassword', 'resetPassword'].includes(view) && !credentials) {
      replace(`${basePath}/${viewPaths.signIn}`)
    }
  }, [basePath, view, viewPaths, credentials, replace, signUp, magicLink])

  useEffect(() => {
    if (view !== 'callback' || isRedirecting.current) return

    if (!persistClient) {
      replace(getRedirectTo())
      return
    }

    if (isRestoring) return

    isRedirecting.current = true

    onSuccess()
  }, [isRestoring, view, replace, persistClient, getRedirectTo, onSuccess])

  if (['signOut', 'callback'].includes(view)) return <Loader2 className="animate-spin" />

  return (
    <form
      action={formAction}
      onChange={() => {
        setErrorMessage(null)
      }}
      className={cn('grid w-full gap-4', className, classNames?.base)}
    >
      {credentials && view === 'signUp' && (nameRequired || signUpFields?.includes('name')) && (
        <div className="grid gap-2">
          <Label className={classNames?.label} htmlFor="name">
            {localization.name}
          </Label>

          <Input
            className={classNames?.input}
            id="name"
            name="name"
            defaultValue={state.name}
            placeholder={localization.namePlaceholder}
            required={nameRequired}
          />
        </div>
      )}

      {credentials && usernamePlugin && ['signIn', 'signUp'].includes(view) && (
        <div className="grid gap-2">
          <Label className={classNames?.label} htmlFor="username">
            {localization.username}
          </Label>

          <Input
            className={classNames?.input}
            id="username"
            name="username"
            placeholder={
              view === 'signIn'
                ? localization.usernameSignInPlaceholder
                : localization.usernamePlaceholder
            }
            defaultValue={state.username}
            required
          />
        </div>
      )}

      {(credentials || (['signIn', 'magicLink'].includes(view) && magicLink)) &&
        ((!usernamePlugin && view !== 'resetPassword') ||
          ['signUp', 'magicLink', 'forgetPassword'].includes(view)) && (
          <div className="grid gap-2">
            <Label className={classNames?.label} htmlFor="email">
              {localization.email}
            </Label>

            <Input
              className={classNames?.input}
              id="email"
              name="email"
              defaultValue={state?.email}
              placeholder={localization.emailPlaceholder}
              required
              type="email"
            />
          </div>
        )}

      {credentials && ['signUp', 'signIn', 'resetPassword'].includes(view) && (
        <>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label className={classNames?.label} htmlFor="password">
                {localization.password}
              </Label>

              {view === 'signIn' && forgotPassword && (
                <Link
                  className={cn(
                    '-my-1 ml-auto inline-block text-sm hover:underline',
                    classNames?.forgotPasswordLink,
                  )}
                  href={`${basePath}/${viewPaths.forgotPassword}`}
                  to={`${basePath}/${viewPaths.forgotPassword}`}
                >
                  {localization.forgotPasswordLink}
                </Link>
              )}
            </div>

            <PasswordInput
              id="password"
              name="password"
              autoComplete={
                ['signUp', 'resetPassword'].includes(view) ? 'new-password' : 'password'
              }
              className={classNames?.input}
              defaultValue={state?.password}
              enableToggle={true}
              placeholder={localization.passwordPlaceholder}
              required
            />
          </div>

          {confirmPasswordEnabled && ['signUp', 'resetPassword'].includes(view) && (
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className={classNames?.label} htmlFor="password">
                  {localization.confirmPassword}
                </Label>
              </div>

              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                className={classNames?.input}
                enableToggle
                placeholder={localization.confirmPasswordPlaceholder}
                required
              />
            </div>
          )}
        </>
      )}

      {view === 'signIn' && rememberMe && (
        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" name="rememberMe" />

          <Label htmlFor="rememberMe">{localization.rememberMe}</Label>
        </div>
      )}

      {view === 'signUp' &&
        signUpFields
          ?.filter((field) => field !== 'name')
          .map((field) => {
            const additionalField = additionalFields?.[field]

            if (!additionalField) {
              console.error(`Invalid additional field: ${field}`)
              return null
            }

            return additionalField.type === 'boolean' ? (
              <div key={field} className="flex items-center gap-2">
                <Checkbox id={field} name={field} required={additionalField.required} />

                <Label className={cn(classNames?.label)} htmlFor={field}>
                  {additionalField?.label}
                </Label>
              </div>
            ) : (
              <div key={field} className="grid gap-2">
                <Label className={classNames?.label} htmlFor={field}>
                  {additionalField?.label}
                </Label>

                <Input
                  className={classNames?.input}
                  id={field}
                  name={field}
                  placeholder={
                    additionalField?.placeholder ||
                    (typeof additionalField?.label === 'string' ? additionalField?.label : '')
                  }
                  required={additionalField?.required}
                  type={additionalField?.type === 'number' ? 'number' : 'text'}
                />
              </div>
            )
          })}

      {(credentials || (['signIn', 'magicLink'].includes(view) && magicLink)) && (
        <ActionButton
          authView={view}
          className={classNames?.actionButton}
          isLoading={isLoading}
          localization={localization}
        />
      )}

      {magicLink && credentials && view !== 'resetPassword' && (
        <MagicLinkButton
          className={classNames?.secondaryButton}
          isLoading={isLoading}
          localization={localization}
          view={view}
        />
      )}

      {!['forgetPassword', 'resetPassword'].includes(view) && providers?.length && (
        <div
          className={cn(
            'flex w-full items-center gap-2',
            'justify-between',
            socialLayout === 'horizontal' && 'flex-wrap',
            socialLayout === 'vertical' && 'flex-col',
            socialLayout === 'grid' && 'grid grid-cols-2',
          )}
        >
          {providers?.map((provider) => {
            const socialProvider = socialProviders.find(
              (socialProvider) => socialProvider.provider === provider,
            )
            if (!socialProvider) return null

            return (
              <ProviderButton
                key={provider}
                className={classNames?.providerButton}
                isLoading={isLoading}
                localization={localization}
                socialLayout={socialLayout}
                socialProvider={socialProvider}
              />
            )
          })}
        </div>
      )}

      {passkey && (
        <PasskeyButton
          className={classNames?.secondaryButton}
          isLoading={isLoading}
          localization={localization}
        />
      )}
    </form>
  )
}
