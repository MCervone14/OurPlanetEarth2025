import { format } from 'date-fns'
import { Post } from '@/payload-types'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Metadata, ResolvingMetadata } from 'next'
const getArticlesByCategory = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return result.docs[0] || null
})

// Generating the Metadata for the page
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = (await params).slug
  const category = await getArticlesByCategory(slug)

  const catIcon = typeof category?.icon === 'object' ? category?.icon : null

  if (!category) {
    return {
      title: 'category not found',
    }
  }
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${category.title} | Our Planet Earth`,
    description: category.description,
    openGraph: {
      images: [catIcon?.url || '', ...previousImages],
    },
  }
}

const ArticlesByCategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  const category = await getArticlesByCategory(slug)
  const articles = category?.['category-posts']

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-blue-950 text-center h-20 text-4xl lg:text-6xl flex justify-center items-end z-10">
        {category.title} Articles
      </h1>
      <div className=" p-5">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-5">
          {(articles as Post[])?.map((article) => (
            <li
              key={article.id}
              className="flex flex-col justify-between border-1 space-y-2 border-green-900 p-5"
            >
              <div className="flex justify-between">
                <Link
                  href={`/articles/${article.slug}`}
                  className="hover:underline font-bold hover:text-blue-600 flex items-center mr-20"
                >
                  {article.title}
                </Link>
                <p className="italic"> {format(new Date(article.publishDate), 'PPPP')}</p>
              </div>
              <p className="line-clamp-4">{article.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="my-10 text-lg bg-gray-600 hover:bg-gray-500 text-secondary cursor-pointer"
        size={'lg'}
        variant={'secondary'}
      >
        <Link href="/articles">Back to Articles</Link>
      </Button>
    </div>
  )
}

export default ArticlesByCategoryPage
