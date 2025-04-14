import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import ImageWithBlur from '../images/ImageWithBlur'

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

  const featuredBlurredImage =
    typeof article[0]?.[`image-blur-url`] === 'object' ? article[0]?.[`image-blur-url`] : null

  return (
    <section className="flex relative flex-col h- w-full px-4">
      <ImageWithBlur featuredImage={featuredImage} featuredBlurredImage={featuredBlurredImage} />
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
