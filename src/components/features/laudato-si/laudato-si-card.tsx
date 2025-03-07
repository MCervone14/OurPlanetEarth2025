import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

interface LaudatoSiCardProps {
  category: {
    description: string
    slug: string
    title: string
    id: number
    image: {
      title: string
      slug: string
      altText: string
      url: string
      width: number
      height: number
    }
    icon: {
      title: string
      slug: string
      altText: string
      url: string
    }
  }
}

const LaudatoSiCard = ({ category }: LaudatoSiCardProps) => {
  console.log(category)
  return (
    <article className="rounded-xl shadow-lg bg-white w-full h-fit relative mt-8 lg:min-h-[620px]">
      <div
        className={`flex flex-col w-full h-full ${Number(category.id) % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        {/*Image Side of Category Card*/}
        <Image
          src={category.image.url}
          alt={category.image.altText}
          width={category.image.width}
          height={category.image.height}
          className={`object-cover ${category.id % 2 === 0 ? 'rounded-r-xl' : 'rounded-l-xl'} lg:min-h-[620px] lg:max-w-[753px]`}
        />
        {/*Text Side of Featured Card*/}
        <div className="flex-col p-5 w-full">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
              <div className={`flex items-center justify-center`}>
                <Image
                  src={category.icon.url}
                  alt={category.icon.altText}
                  width={175}
                  height={175}
                  className="rounded-full"
                />
              </div>
              <Separator className="border-gray-300 border-[1px]" />
              <div className="flex flex-col space-y-6 p-5">
                <h2 className="text-5xl">
                  <Link
                    href={`/articles/${category.slug}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {category.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-8">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default LaudatoSiCard
