import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: {
    read: () => true,
  },
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
      name: 'slug',
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
      name: 'image-blur-url',
      label: 'Author Image blur',
      type: 'upload',
      relationTo: 'media',
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
