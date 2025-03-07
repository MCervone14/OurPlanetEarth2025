import { Block } from 'payload'
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { VideoBlock } from '@/blocks/video-block'

export const ArticleContentWithMedia: Block = {
  slug: 'articleContentWithMedia',
  labels: {
    singular: 'Content with Media Block',
    plural: 'Content with Media Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [VideoBlock],
          }),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
