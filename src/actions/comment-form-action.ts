'use server'

export const HandleCommentFormSubmit = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  console.log(data)

  // const response = await fetch('/api/comments', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         author: { name, email },
  //         content,
  //         post: articleId,
  //         comments: articleId,
  //     }),
  // })
  //
  // const result = await response.json()
  //
  // if (response.ok) {
  //     setName(sessionData?.user?.name || '')
  //     setEmail(sessionData?.user?.email || '')
  //     setContent('')
  //     setMessage('')
  // }
  //
  // if (!response.ok) {
  //     const errorMessage = result.errors?.[0]?.message
  //     setMessage(errorMessage)
  // }
}
