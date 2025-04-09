import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const getFeaturedPost = async () => {
  const articles = await payload.find({
    collection: 'posts',
    sort: '-publishDate',
    limit: 1,
    depth: 2,
  })

  return articles.docs
}

const HomeCover = async () => {
  const article = await getFeaturedPost()

  const featuredImage =
    typeof article[0]?.featuredImage === 'object' ? article[0].featuredImage : null
  return (
    <section className="flex relative flex-col h- w-full px-4">
      <Image
        src={featuredImage?.url ?? ''}
        alt={featuredImage?.altText ?? ''}
        width={featuredImage?.width ?? 0}
        height={featuredImage?.height ?? 0}
        className="object-cover w-full"
      />
      <div className="w-full mx-auto p-6 flex flex-col items-start bottom-0 z-10 text-white bg-slate-900 ">
        <Link href={`/articles/${article[0]?.slug}`} className="my-3 hover:text-green-600">
          <h1 className="font-bold text-lg md:text-2xl lg:text-4xl">
            <span className="bg-gradient-to-r line-clamp-4 md:line-clamp-none hover:underline">
              {article[0]?.title}
            </span>
          </h1>
        </Link>
        <p className="text-md md:text-lg lg:text-xl rounded-xl line-clamp-3 lg:line-clamp-none">
          {article[0]?.excerpt}
        </p>
      </div>
    </section>
  )
}

export default HomeCover
