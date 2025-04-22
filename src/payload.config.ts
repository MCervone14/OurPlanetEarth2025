import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './payload/collections/Users'
import { Posts } from 'src/payload/collections/Posts'
import { Media } from './payload/collections/Media'
import { Authors } from './payload/collections/Authors'
import { Categories } from './payload/collections/Categories'
import { Comments } from 'src/payload/collections/Comments'
import sharp from 'sharp'
import path from 'path'
import { betterAuthPlugin } from 'payload-auth/better-auth'
import { betterAuthPluginOptions } from '@/payload/options'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import { Products } from '@/payload/collections/Products'
import { AudioChapters } from '@/payload/collections/AudioChapters'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const allowedOrigins = [process.env.NEXT_PUBLIC_SERVER_URL as string].filter(Boolean)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        'reset-password': {
          Component: '@/components/features/auth/reset-password#ResetPass',
          path: '/reset-password',
        },
        'forget-password': {
          Component: '@/components/features/auth/forget-password#ForgetPass',
          path: '/forget-password',
        },
      },
    },
  },
  collections: [Users, Media, Posts, Categories, Authors, Comments, Products, AudioChapters],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress: 'no-reply@blog.ourplanetearth.eco',
    defaultFromName: 'Our Planet Earth',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  plugins: [
    betterAuthPlugin(betterAuthPluginOptions),
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
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
  cors: allowedOrigins,
  csrf: allowedOrigins,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
