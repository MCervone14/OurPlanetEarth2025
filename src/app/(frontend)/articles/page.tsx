import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import FeaturedIndividualCard from '@/components/features/articles/featured articles/featured-card'

const payload = await getPayload({ config })
const GetAllArticles = async () => {
  const articles = await payload.find({
    collection: 'posts',
    sort: '-publishDate',
    depth: 2,
  })

  return articles.docs as Post[]
}

const ArticlesPage = async ({ articles }: any) => {
  const allArticles = await GetAllArticles()

  if (!allArticles) {
    return <p className="mt-10 text-center">Sorry, no articles available</p>
  }

  return (
    <section className="my-16 mx-auto max-w-8xl">
      <ul className="w-full list-none p-0">
        {allArticles.map((article, idx) => (
          <FeaturedIndividualCard key={idx} article={article} />
        ))}
      </ul>
    </section>
  )
}

export default ArticlesPage
