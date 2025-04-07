import type { Plugin } from 'payload'
import { payloadBetterAuth, type PayloadBetterAuthOptions } from '@payload-auth/better-auth-plugin'
import {
  admin,
  multiSession,
  organization,
  twoFactor,
  openAPI,
  anonymous,
  phoneNumber,
  magicLink,
  emailOTP,
  apiKey,
} from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'
import { passkey } from 'better-auth/plugins/passkey'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import { getPayload } from 'payload'
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
    issuer: 'OurPlanetEarth',
    otpOptions: {
      async sendOTP({ user, otp }) {
        console.log('Send OTP for user: ', user, otp)
      },
    },
  }),
  anonymous({
    emailDomainName: 'OurPlanetEarth.eco@gmail.com',
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
    rpID: 'OurPlanetEarth',
    rpName: 'payload-better-auth-demo',
    origin: 'http://localhost:5000',
  }),
  admin(),
  apiKey(),
  organization({
    teams: {
      enabled: true,
    },
    async sendInvitationEmail(data) {
      const inviteLink = `http://localhost:5000/accept-invitation/${data.id}`
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
  baseURL: 'http://localhost:5000',
  trustedOrigins: ['http://localhost:5000'],
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
      requireSelectAccount: true,
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

  //@ts-expect-error mismatch types
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

export const plugins: Plugin[] = [
  //@ts-expect-error Error with different versions of payload from plugins.
  payloadBetterAuth({
    disabled: false,
    logTables: false,
    enableDebugLogs: true,
    hidePluginCollections: true,
    users: {
      slug: 'users',
      hidden: false,
      adminRoles: ['admin'],
    },
    accounts: {
      slug: 'accounts',
      hidden: false,
    },
    sessions: {
      slug: 'sessions',
      hidden: false,
    },
    verifications: {
      slug: 'verifications',
      hidden: false,
    },
    betterAuthOptions,
  }),
  seoPlugin({
    uploadsCollection: 'media',
    generateTitle: ({ doc }) => `${doc.title} - Our Planet Earth`,
    generateDescription: ({ doc }) => doc.excerpt,
  }),
  payloadCloudPlugin(),
  s3Storage({
    collections: {
      media: {
        prefix: 'media',
      },
    },
    bucket: process.env.S3_BUCKET as string,
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    },
  }),
]
