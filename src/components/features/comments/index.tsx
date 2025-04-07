import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Comment } from '@/payload-types'
import CommentForm from '@/components/features/comments/CommentForm'

const Comments = async ({ articleId }: { articleId: number }) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: comments } = await payload.find({
    collection: 'comments',
    where: {
      //@ts-expect-error Need to figure out why it doesn't like post type
      post: articleId,
    },
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Comments on Article</h2>
      {(comments as Comment[]).map((comment) => (
        <div key={comment.id} className="flex gap-4 mb-4 border border-gray-200 p-2">
          <div className="flex-grow">
            <div className="mb-1">
              <span className="font-bold">{comment.author.name}</span>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(comment.createdAt).toDateString()}
              </span>
            </div>
            <p className="mb-2">{comment.content}</p>
          </div>
        </div>
      ))}
      <CommentForm articleId={articleId} />
    </div>
  )
}

export default Comments
