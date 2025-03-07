import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'category',
  },
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  fields: [
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
      name: 'slug',
      type: 'text',
      required: true,
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
