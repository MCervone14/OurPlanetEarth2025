import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import SerializedLexical from '@/components/features/lexical/serialize-lexical'
import Image from 'next/image'
import { FileIcon } from 'lucide-react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import Comments from '@/components/features/comments'
import { Category } from '@/payload-types'

interface RichTextNode {
  type: string
  children: RichTextNode[]
  text?: string
  url?: string
}

const GetArticle = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return result.docs?.[0] || null
})

const SingleArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug
  const article = await GetArticle(slug)

  const featuredImage = typeof article?.featuredImage === 'object' ? article.featuredImage : null
  const categories = typeof article?.categories === 'object' ? article.categories : null

  if (!article) {
    return <p>No Article Found!</p>
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <article className="relative flex items-center justify-center flex-col bg-white shadow-2xl">
      <p className="absolute border-2 border-white top-1 right-1 bg-green-950 text-white p-2">
        {format(new Date(article.publishDate), 'PPPP')}
      </p>
      <Image
        src={featuredImage?.url ?? ''}
        alt={featuredImage?.altText ?? ''}
        width={featuredImage?.width ?? 0}
        height={featuredImage?.height ?? 0}
        className="object-cover min-h-[450px] min-w-6xl"
      />
      <div className="w-full border-4 text-xs lg:text-lg border-green-950">
        <ul className="flex justify-start items-center">
          <div className="border-r-2 p-5">
            {(categories as Category[])?.map((cat) => (
              <li key={cat.id} className="flex items-center text-center p-0">
                <Link href={`/category/${cat.slug}`} className="hover:underline flex items-center">
                  <FileIcon className="mr-1 h-4 w-4 hidden md:block" />
                  {cat.category}
                </Link>
              </li>
            ))}
          </div>
          <div>
            <li className="h-full p-5 border-r-2">
              <Link
                href={`#comments`}
                className="flex items-center hover:text-blue-600 transition-colors scroll-auto"
              >
                <ChatBubbleIcon className="mr-1 h-4 w-4" />
                <span>{article?.comments.length}</span>
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="px-40 py-10">
        <h1 className="mb-4 text-lg lg:text-6xl">{article.title}</h1>
        <div className="prose-a:text-blue-700 hover:prose-a:text-blue-600">
          {/*@ts-ignore*/}
          <SerializedLexical blocks={article.blocks} />
        </div>
      </div>
      <div id="comments">
        <Comments articleId={String(article.id)} />
      </div>
      <Button className="my-10 text-lg" size={'lg'} variant={'secondary'}>
        <Link href="/articles">Back to Articles</Link>
      </Button>
      {/*<div>*/}
      {/*  <h3>Other Related Articles:</h3>*/}
      {/*  /!*{relatedArticles.slice(1, 4).map((article, idx) => (*!/*/}
      {/*  /!*  <RelatedArticle key={idx} article={article} />*!/*/}
      {/*  /!*))}*!/*/}
      {/*</div>*/}
    </article>
  )
}

export default SingleArticlePage
