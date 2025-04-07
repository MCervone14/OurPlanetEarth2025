import type { CollectionConfig } from 'payload'
import { ArticleContentWithMedia } from '@/payload/blocks/article-content-with-media'
import { VideoBlock } from '@/payload/blocks/video-block'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      label: 'Publish Date',
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'blocks',
      label: 'Content',
      type: 'blocks',
      blocks: [ArticleContentWithMedia, VideoBlock],
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Feature Image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'comments',
      type: 'relationship',
      relationTo: 'comments',
      hasMany: true,
    },
  ],
  // hooks: {
  //   afterChange: [
  //     async ({ req: { payload } }) => {
  //       const sendEmail = await payload.sendEmail({
  //         to: 'youngmc89@yahoo.com',
  //         subject: 'You have sent an email',
  //         text: 'You have sent an email',
  //       })
  //     },
  //   ],
  // },
}
