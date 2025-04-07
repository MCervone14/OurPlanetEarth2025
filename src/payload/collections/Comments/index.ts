import { APIError, CollectionConfig } from 'payload'
import ModerateCommentContent from '@/utilities/moderate-comment-content'
import { Comment } from '@/payload-types'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const moderationResult = await ModerateCommentContent(data.content)
        let isOffensive = false

        for (const category of moderationResult.categoriesAnalysis) {
          if (category.severity > 0) {
            isOffensive = true
            break
          }
        }

        if (isOffensive) {
          throw new APIError('Your comment contains inappropriate content.', 400, undefined, true)
        }

        data.approved = !isOffensive
        return data
      },
    ],
    afterChange: [
      async ({ doc, req: { payload } }) => {
        const post = doc.post // Already populated Post object

        const updatedComments = post.comments
          ? [...post.comments.map((c: Comment) => c.id || c), doc.id]
          : [doc.id]

        payload.update({
          collection: 'posts',
          id: post.id,
          data: {
            comments: updatedComments,
          },
        })
      },
    ],
  },
}
