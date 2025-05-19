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
      defaultValue: 'name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imageBase64',
      label: 'Author Image blur',
      type: 'text',
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
