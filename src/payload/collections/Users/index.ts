import type { CollectionConfig, PayloadRequest } from 'payload'
import type { User } from 'payload'

type EmailFunctionParams = {
  req: PayloadRequest
  token: string
  user: User
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    // verify: {
    //   generateEmailHTML: ({ req, token, user }: EmailFunctionParams) => {
    //     // Use the token provided to allow your user to verify their account
    //     const url = `http://localhost:5000/verify/${token}`
    //
    //
    //     return `Hello ${user.email}, please verify your email by clicking on this link: <a target="_blank" href="${url}"> ${url}</a>`
    //   },
    // },
    // forgotPassword: {
    //   //@ts-expect-error Payload docs say use generateEmailHTML for forgotPassword.
    //   generateEmailHTML: ({ req, token, user }: EmailFunctionParams) => {
    //     const url = `http://localhost:5000/reset/${token}`
    //
    //     return `
    //             You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:
    //             <a target="_blank" href="${url}"> ${url}</a>
    //              If you did not request this, please ignore this email and your password will remain unchanged.
    //            `
    //   },
    // },
  },
  fields: [],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        id: { equals: req.user?.id },
      }
    },
    create: () => true,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      return {
        id: { equals: req.user?.id },
      }
    },
    admin: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeLogin: [
      async ({ req, user }) => {
        if (!user.email_verified && user.role === 'user') {
          throw new Error('Please verify your email before logging in.')
        }
      },
    ],
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const existingUsers = await req.payload.find({
            collection: 'users',
            limit: 1,
          })

          if (existingUsers.totalDocs === 0) {
            data.role = 'admin'
          }
        }
        return data
      },
    ],
  },
}
