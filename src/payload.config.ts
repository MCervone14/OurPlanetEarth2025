// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Payload } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Posts } from '@/collections/Posts'
import { Media } from './collections/Media'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Comments } from '@/collections/Comments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, Authors, Comments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
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
  ],
  onInit: async (payload: Payload) => {
    console.log('Seeding the Admin Users')
    const existingAdmins = await payload.find({
      collection: 'users',
      where: {
        roles: {
          equals: 'admin',
        },
      },
    })

    if (existingAdmins.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'youngmc89@yahoo.com',
          password: 'Pa$$w0rd', // local dummy Pass
          roles: 'admin',
        },
      })
    }
  },
})
