import { buildConfig } from 'payload'
import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  email: resendAdapter({
    defaultFromAddress: 'no-reply@blog.ourplanetearth.eco',
    defaultFromName: 'Our Planet Earth',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
})
