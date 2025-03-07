import Link from 'next/link'
import RecentIndividualCard from './recent-card'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'

const payload = await getPayload({ config })
const getRecentPosts = async () => {
  const articles = await payload.find({
    collection: 'posts',
    sort: '-publishDate',
    limit: 10,
  })

  return articles.docs as Post[]
}

const RecentSection = async () => {
  const articles = await getRecentPosts()
  return (
    <section className="w-full mt-16 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 ">
        {articles.map((article, idx) => (
          <RecentIndividualCard key={idx} article={article} />
        ))}
      </div>
    </section>
  )
}

export default RecentSection
