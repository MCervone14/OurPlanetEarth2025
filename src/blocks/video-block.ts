import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      label: 'Duration (in minutes)',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      label: 'Video Player URL',
      type: 'text',
      required: true,
    },
  ],
}
