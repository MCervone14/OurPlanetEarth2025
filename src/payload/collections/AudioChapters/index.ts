import { CollectionConfig } from 'payload'

export const AudioChapters: CollectionConfig = {
  slug: 'audioChapters',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Audio Chapter',
    plural: 'Audio Chapters',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Order',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration (e.g., 14:23)',
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Parent Product',
    },
  ],
}
