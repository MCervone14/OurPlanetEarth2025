import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Author Name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author-posts',
      label: 'Posts by Author',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
  ],
}
