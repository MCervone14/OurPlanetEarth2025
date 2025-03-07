'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CommentForm = ({ articleId }: { articleId: number }) => {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: { name, email },
        content,
        post: Number(articleId),
        comments: Number(articleId),
      }),
    })
    const result = await response.json()

    if (response.ok) {
      setName('')
      setEmail('')
      setContent('')
      setMessage('')
      router.refresh()
    }

    if (!response.ok) {
      const errorMessage = result.errors?.[0]?.message
      setMessage(errorMessage)
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6">Leave a Reply</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 min-h-32"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2"
            />
          </div>
          {message && <div className="text-red-500">{message}</div>}
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-medium"
        >
          Post Comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
