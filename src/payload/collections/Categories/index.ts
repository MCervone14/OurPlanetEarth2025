import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'category',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Cry of the Earth',
        'Cry of the Poor',
        'Ecological Economics',
        'Simple Lifestyles',
        'Ecological Education',
        'Ecological Spirituality',
        'Community Involvement',
      ],
      required: true,
    },
    {
      name: 'imageBase64',
      label: 'Category Image blur',
      type: 'text',
    },
    {
      name: 'category-posts',
      label: 'Post in this Category',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'title',
      label: 'Official Category Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Category Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'color',
      label: 'Category Background Color (TailwindCss class)',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      label: 'Category Icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'image',
      label: 'Category Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'keywords',
      label: 'Category Keywords',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
  ],
}
