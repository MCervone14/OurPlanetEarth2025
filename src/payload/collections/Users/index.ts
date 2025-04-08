import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
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
