import { getPayload } from 'payload'
import config from '@payload-config'
import FeaturedIndividualCard from '@/components/features/articles/featured articles/featured-card'
import { PaginationComponent } from '@/components/features/pagination'
import { cache } from 'react'

export const metadata = {
  title: 'Articles | Our Planet Earth',
}
const GetAllArticles = cache(async (page: string) => {
  const payload = await getPayload({ config })
  return await payload.find({
    collection: 'posts',
    sort: '-publishDate',
    depth: 2,
    page: Number(page),
    pagination: true,
  })
})

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const page = (await searchParams).page

  const data = await GetAllArticles(page as string)

  if (!data) {
    return <p className="mt-10 text-center">Sorry, no articles available</p>
  }

  return (
    <section className="my-16 mx-auto max-w-8xl">
      <div className="mx-auto flex-col lg:flex-row">
        <h1 className="text-blue-950 text-center h-20 text-4xl lg:text-8xl flex justify-center items-end z-10">
          Our Planet Earth Articles
        </h1>
        <ul className="w-full list-none p-5 md:p-none">
          {data.docs.map((article, idx) => (
            <FeaturedIndividualCard key={idx} article={article} index={idx} />
          ))}
        </ul>
      </div>
      <PaginationComponent
        hasNextPage={data.hasNextPage}
        hasPrevPage={data.hasPrevPage}
        nextPage={data.nextPage!}
        prevPage={data.prevPage!}
        page={data.page || 1}
        totalPages={data.totalPages}
      />
    </section>
  )
}

export default ArticlesPage
