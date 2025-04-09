import { generateVerifyEmailUrl } from 'payload-auth/better-auth/plugin'
import type {
  BetterAuthReturn,
  PayloadBetterAuthOptions,
  PayloadBetterAuthPluginOptions,
} from 'payload-auth/better-auth'
import { nextCookies } from 'better-auth/next-js'
import {
  admin,
  anonymous,
  apiKey,
  emailOTP,
  magicLink,
  multiSession,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
} from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'
import { CollectionConfig, getPayload } from 'payload'
import config from '@payload-config'

export const betterAuthPlugins = [
  twoFactor({
    schema: {
      user: {
        modelName: 'users',
        fields: {
          userId: 'user',
        },
      },
      twoFactor: {
        modelName: 'twoFactors',
        fields: {
          userId: 'user',
        },
      },
    },
    issuer: 'payload-better-auth',
    otpOptions: {
      async sendOTP({ user, otp }) {
        console.log('Send OTP for user: ', user, otp)
      },
    },
  }),
  anonymous({
    emailDomainName: 'OurPlanetEarth',
    onLinkAccount: async ({ anonymousUser, newUser }) => {
      console.log('Link account for anonymous user: ', anonymousUser, newUser)
    },
    disableDeleteAnonymousUser: false,
  }),
  phoneNumber({
    sendOTP: async ({ phoneNumber, code }, req) => {
      console.log('Send OTP for user: ', phoneNumber, code)
    },
  }),
  magicLink({
    sendMagicLink: async ({ email, token, url }, request) => {
      console.log('Send magic link for user: ', email, token, url)
    },
  }),
  emailOTP({
    async sendVerificationOTP({ email, otp, type }) {
      console.log('Send verification OTP for user: ', email, otp, type)
    },
  }),
  passkey({
    rpID: 'payload-better-auth',
    rpName: 'payload-better-auth-demo',
    origin: 'http://localhost:3000',
  }),
  admin(),
  apiKey(),
  organization({
    teams: {
      enabled: true,
    },
    async sendInvitationEmail(data) {
      const inviteLink = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/accept-invitation/${data.id}`
      console.log('Send invite for org: ', data, inviteLink)
    },
  }),
  multiSession(),
  openAPI(),
  nextCookies(),
]

export type BetterAuthPlugins = typeof betterAuthPlugins

export const betterAuthOptions: PayloadBetterAuthOptions = {
  appName: 'ourplanetearth',
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
  trustedOrigins: [process.env.NEXT_PUBLIC_SERVER_URL as string],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 3600,
    async sendResetPassword({ user, url }) {
      const payload = await getPayload({ config })
      await payload.sendEmail({
        to: user.email,
        subject: 'Reset Your Password',
        text: `Click the link to reset your email: ${url}`,
        html: `<p>Click the link below to reset your password: </p> <a href="${url}">${url}</a>`,
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET as string,
      tenantId: 'common',
    },
    facebook: {
      clientId: process.env.FACEBOOK_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      const payload = await getPayload({ config })

      const modifiedUrl = new URL(url)
      modifiedUrl.searchParams.set('callbackURL', '/auth/sign-in')

      await payload.sendEmail({
        to: user.email,
        subject: 'Email verification email',
        text: `Click the link to verify your email: ${modifiedUrl.toString()}`,
      })
    },
  },
  plugins: betterAuthPlugins,
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        console.log('Send change email verification for user: ', user, newEmail, url, token)
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        // Send delete account verification
      },
      beforeDelete: async (user) => {
        // Perform actions before user deletion
      },
      afterDelete: async (user) => {
        // Perform cleanup after user deletion
      },
    },
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        input: false,
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'email-password'],
    },
  },
}

export const betterAuthPluginOptions: PayloadBetterAuthPluginOptions = {
  disabled: false,
  logTables: false,
  enableDebugLogs: false,
  hidePluginCollections: true,
  users: {
    slug: 'users',
    hidden: false,
    adminRoles: ['admin'],
    allowedFields: ['name'],
    // blockFirstBetterAuthVerificationEmail: true,
    // collectionOverrides: ({ collection }) => {
    //   return {
    //     ...collection,
    //     auth: {
    //       ...(typeof collection?.auth === 'object' ? collection.auth : {}),
    //       verify: {
    //         generateEmailHTML: async ({ user, req, token }) => {
    //           const betterAuth = (req.payload as any)
    //             .betterAuth as BetterAuthReturn<BetterAuthPlugins>
    //           const authContext = await betterAuth.$context
    //           const verifyUrl = await generateVerifyEmailUrl({
    //             userEmail: user.email,
    //             secret: authContext.secret,
    //             expiresIn: betterAuth.options?.emailVerification?.expiresIn || 3600,
    //             verifyRouteUrl: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/verify-email`,
    //             callbackURL: '/dashboard',
    //           })
    //
    //           console.log('generateEmailHTML verifyUrl', verifyUrl)
    //
    //           return `<p>Verify your email by clicking <a href="${verifyUrl}">here</a></p>`
    //         },
    //       },
    //     },
    //   } satisfies CollectionConfig
    //},
  },
  accounts: {
    slug: 'accounts',
  },
  sessions: {
    slug: 'sessions',
  },
  verifications: {
    slug: 'verifications',
  },
  betterAuthOptions: betterAuthOptions,
}
