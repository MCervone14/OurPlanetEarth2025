import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'productType',
      type: 'select',
      label: 'Product Type',
      required: true,
      options: [
        { label: 'Audiobook', value: 'audiobook' },
        { label: 'Ebook', value: 'ebook' },
        { label: 'book', value: 'book' },
        { label: 'Merch', value: 'merch' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Quantity',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'audioChapters',
      type: 'relationship',
      relationTo: 'audioChapters',
      hasMany: true,
      admin: {
        condition: (data) => data?.productType === 'audiobook',
      },
    },
  ],
}
