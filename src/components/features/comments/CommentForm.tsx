'use client'

import { useContext, useState, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AuthUIContext } from '@/components/features/providers/auth-ui-provider'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { HandleCommentFormSubmit } from '@/actions/comment-form-action'

const CommentForm = ({ articleId }: { articleId: number }) => {
  const {
    hooks: { useSession },
  } = useContext(AuthUIContext)
  const { data: sessionData } = useSession()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [name, setName] = useState(sessionData?.user?.name || '')
  const [email, setEmail] = useState(sessionData?.user?.email || '')
  const [message, setMessage] = useState('')

  // const handleSubmit = async () => {
  //   const response = await fetch('/api/comments', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       author: { name, email },
  //       content,
  //       post: articleId,
  //       comments: articleId,
  //     }),
  //   })
  //
  //   const result = await response.json()
  //
  //   if (response.ok) {
  //     setName(sessionData?.user?.name || '')
  //     setEmail(sessionData?.user?.email || '')
  //     setContent('')
  //     setMessage('')
  //   }
  //
  //   if (!response.ok) {
  //     const errorMessage = result.errors?.[0]?.message
  //     setMessage(errorMessage)
  //   }
  // }

  // const [state, formAction, isSubmitting] = useActionState(HandleCommentFormSubmit, null)

  return (
    <div className="mt-12">
      {/*<h3 className="text-xl font-bold mb-6">Leave a Reply</h3>*/}
      {/*<form action={() => {}}>*/}
      {/*  <div className="mb-4">*/}
      {/*    <label htmlFor="comment" className="block mb-2">*/}
      {/*      Comment <span className="text-red-500">*</span>*/}
      {/*    </label>*/}
      {/*    <textarea*/}
      {/*      id="comment"*/}
      {/*      value={content}*/}
      {/*      onChange={(e) => setContent(e.target.value)}*/}
      {/*      required*/}
      {/*      className="w-full border border-gray-300 p-2 min-h-32"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">*/}
      {/*    <div>*/}
      {/*      <label htmlFor="name" className="block mb-2">*/}
      {/*        Name <span className="text-red-500">*</span>*/}
      {/*      </label>*/}
      {/*      <Input*/}
      {/*        type="text"*/}
      {/*        id="name"*/}
      {/*        defaultValue={sessionData?.user.name || ''}*/}
      {/*        onChange={(e) => setName(e.target.value)}*/}
      {/*        required*/}
      {/*        className="w-full border border-gray-300 p-2"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <Button*/}
      {/*    type="submit"*/}
      {/*    className="bg-green-800 hover:bg-green-700 text-secondary px-6 py-3 font-medium cursor-pointer w-[125px]"*/}
      {/*  >*/}
      {/*    {isSubmitting ? (*/}
      {/*      <Loader2 className={'w-5 h-5 flex item-center justify-center animate-spin'} />*/}
      {/*    ) : (*/}
      {/*      'Post Comment'*/}
      {/*    )}*/}
      {/*  </Button>*/}
      {/*</form>*/}
    </div>
  )
}

export default CommentForm
