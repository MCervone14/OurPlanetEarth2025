import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'altText',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'photoCredit',
      label: 'Photo Credit',
      type: 'richText',
    },
    {
      name: 'post',
      type: 'relationship',
      label: 'Blog Post',
      relationTo: 'posts',
    },
  ],
  upload: true,
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.post) {
          const post = await req.payload.findByID({
            collection: 'posts',
            id: data.post,
          })

          if (post?.title) {
            const title = post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
            data.folder = `articles/${title}`
          }
        }
      },
    ],
  },
}
