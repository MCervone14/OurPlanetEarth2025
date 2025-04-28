import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/payload-types'
import Image from 'next/image'

type RecentArticleProps = {
  article: Post
}

const RecentIndividualCard = ({ article }: RecentArticleProps) => {
  const featuredImage = typeof article.featuredImage === 'object' ? article.featuredImage : null
  const featuredBlurredImage =
    typeof article?.[`image-blur-url`] === 'object' ? article?.[`image-blur-url`] : null

  return (
    <article className="relative shadow-lg bg-white rounded-lg">
      <Image
        src={featuredImage?.url ?? ''}
        overrideSrc={featuredImage?.url ?? ''}
        alt={featuredImage?.altText ?? ''}
        width={featuredImage?.width ?? 0}
        height={featuredImage?.height ?? 0}
        blurDataURL={featuredBlurredImage?.url ?? ''}
        className={'aspect-[4/3] object-center object-cover rounded'}
        placeholder="blur"
      />
      <div className="p-5">
        {/*{article.categories.map((category) => (*/}
        {/*  <CategoryTags*/}
        {/*    key={category}*/}
        {/*    id={category}*/}
        {/*    className="p-1 rounded-xl text-xs md:text-sm lg:text-md"*/}
        {/*  />*/}
        {/*))}*/}
        <Link href={`/articles/${article.slug}`} className="my-3" key={article.id}>
          <h2 className="font-bold text-lg lg:text-2xl">
            <span className="hover:text-green-600">{article.title}</span>
          </h2>
        </Link>
        <span className="text-base bg-gray-100 p-1 absolute top-1 right-1">
          {format(new Date(article.publishDate), 'MMMM dd, yyyy')}
        </span>
        <p className="line-clamp-10 mt-2">{article.excerpt}</p>
      </div>
    </article>
  )
}

export default RecentIndividualCard
