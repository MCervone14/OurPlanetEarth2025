import { getPayload } from 'payload'
import configPromise from '@payload-config'
import AuthorCard from '@/components/features/author/author-card'

export const metadata = {
  title: 'Team | Our Planet Earth',
}

const GetAuthorInfo = async () => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'authors',
  })

  return result.docs || null
}

const TeamPage = async () => {
  const authors = await GetAuthorInfo()

  if (!authors) {
    return <div>No Authors were found!</div>
  }

  return (
    <div className="mx-auto flex-col lg:flex-row">
      <h1 className="text-green-700 text-center my-8 h-20 text-3xl md:text-6xl lg:text-8xl flex justify-center items-end z-10">
        Our Planet Earth Team
      </h1>
      <div>
        {authors.map((author, idx) => (
          <div key={idx} className="max-w-7xl mx-auto p-5 lg:p-0">
            <AuthorCard author={author} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamPage
