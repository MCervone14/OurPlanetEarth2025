import FeaturedIndividualFeatureCard from './featured-card'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'

const payload = await getPayload({ config })
const getFeaturedPosts = async () => {
  const articles = await payload.find({
    collection: 'posts',
    sort: '-publishDate',
    depth: 2,
    limit: 5,
  })

  return articles.docs as Post[]
}

const FeaturedSection = async () => {
  const articles = await getFeaturedPosts()

  return (
    <section className="w-full mt-16 flex flex-col items-center justify-center px-4">
      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <section className="" key={article.id}>
            <FeaturedIndividualFeatureCard article={article} />
          </section>
        ))}
      </div>
    </section>
  )
}

export default FeaturedSection
