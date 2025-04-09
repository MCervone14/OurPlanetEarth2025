import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Post, Category } from '@/payload-types'
import { ArrowRightIcon, CalendarIcon, FileIcon } from 'lucide-react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

const FeaturedIndividualCard = ({ article }: { article: Post }) => {
  const featuredImage = typeof article?.featuredImage === 'object' ? article.featuredImage : null
  const categories = typeof article?.categories === 'object' ? article.categories : null
  const author = typeof article?.author === 'object' ? article.author : null
  const authorImage = typeof author?.image === 'object' ? author?.image : null

  return (
    <article className="rounded-xl shadow-lg bg-white relative mt-8 max-w-[650px] lg:max-w-[1250px] mx-auto">
      <div
        className={`flex flex-col  ${Number(article.id) % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        <div className="absolute top-0 right-0 z-10 bg-gray-200 px-2 py-1 text-sm t flex justify-center items-center rounded-tr-md">
          <CalendarIcon className="inline-block mr-1 h-4 w-4 " />
          {format(new Date(article?.publishDate), 'MMMM dd, yyyy')}
        </div>
        {/*Image Side of Featured Card*/}
        <Image
          src={featuredImage?.url ?? ''}
          alt={featuredImage?.altText ?? ''}
          width={1250}
          height={800}
          unoptimized={true}
          placeholder="blur"
          blurDataURL={featuredImage?.url ?? ''}
          className={`object-cover w-full lg:max-w-1/2 ${Number(article.id) % 2 === 0 ? 'rounded-t-xl lg:rounded-t-none lg:rounded-r-xl' : 'rounded-t-xl lg:rounded-t-none lg:rounded-l-xl'} `}
        />
        {/*Text Side of Featured Card*/}
        <div className="flex-col p-5 lg:max-w-1/2">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
              <div
                className={`flex items-center ${Number(article.id) % 2 === 0 ? 'lg:justify-end' : ''} `}
              >
                <Image
                  src={authorImage?.url ?? ''}
                  alt={authorImage?.altText ?? ''}
                  width={64}
                  height={64}
                  className="rounded-full mr-3"
                />
                <span className="text-sm text-gray-600">
                  by{' '}
                  <Link
                    href={`/author/${authorImage?.slug.toLowerCase()}`}
                    className="hover:underline"
                  >
                    {author?.name}
                  </Link>
                </span>
              </div>
              <Separator className="border-gray-300 border-[1px]" />
              <h2 className="text-2xl lg:text-5xl">
                <Link
                  href={`/articles/${article.slug}`}
                  className="   hover:text-green-600 transition-colors line-clamp-2"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-4">{article.excerpt}</p>
            </div>
          </div>
          {/*The Card Navigation Bar*/}
          <div className="w-full border-4 text-xs lg:text-lg border-green-950">
            <ul className="flex justify-between items-center">
              <div className="border-r-2 p-5">
                {(categories as Category[]).map((cat) => (
                  <li className="flex items-center text-center p-0" key={cat.id}>
                    <Link
                      href={`/category/${cat.category.toLowerCase()}`}
                      className="hover:underline flex items-center"
                    >
                      <FileIcon className="mr-1 h-4 w-4 hidden md:block" />
                      {cat.category}
                    </Link>
                  </li>
                ))}
              </div>
              <div>
                <li className="h-full p-2">
                  <Link
                    href={`/articles/${article.slug}#comments`}
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <ChatBubbleIcon className="mr-1 h-4 w-4" />
                    <span>{article.comments?.length}</span>
                  </Link>
                </li>
              </div>
              <Link href={`/articles/${article.slug}`} className="flex items-center text-white  ">
                <div className="flex bg-green-950 hover:bg-green-900 transition-colors p-5">
                  <li className="flex items-center text-center">
                    <ArrowRightIcon className="hidden md:block mr-1 h-4 w-4 fill-white stroke-white " />
                    <span>Read More</span>
                  </li>
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export default FeaturedIndividualCard
