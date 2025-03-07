import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import type { CollectionConfig } from 'payload'
import { tree } from 'next/dist/build/templates/app-page'
import { ArticleContentWithMedia } from '@/blocks/article-content-with-media'
import { MetaDescriptionField, MetaImageField, MetaTitleField } from '@payloadcms/plugin-seo/fields'
import { VideoBlock } from '@/blocks/video-block'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
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
      required: true,
    },
  ],
}
