import { getPayload } from 'payload'
import configPromise from '@payload-config'
import AuthorCard from '@/components/features/author/author-card'

const GetAuthorInfo = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'authors',
  })

  return result.docs || null
}

const TeamPage = async () => {
  const authors = await GetAuthorInfo()
  return (
    <div className="mx-auto flex-col lg:flex-row">
      <h1 className="text-green-700 text-center my-16 h-20 text-4xl lg:text-8xl flex justify-center items-end z-10">
        Our Planet Earth Team
      </h1>
      <div className="">
        {authors.map((author) => (
          <AuthorCard author={author} />
        ))}
      </div>
    </div>
  )
}

export default TeamPage
