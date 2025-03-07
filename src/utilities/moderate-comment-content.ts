const ModerateCommentContent = async (text: string) => {
  const endpoint = process.env.AZURE_CONTENT_MODERATOR_ENDPOINT as string
  const apiKey = process.env.AZURE_CONTENT_MODERATOR_API_KEY as string

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
      body: JSON.stringify({
        text,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error('Failed to moderate content')
  }
}

export default ModerateCommentContent
