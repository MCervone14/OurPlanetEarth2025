import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Category } from '@/payload-types'

interface LaudatoSiCardProps {
  category: Category
  index: number
}

const LaudatoSiCard = ({ category, index }: LaudatoSiCardProps) => {
  const categoryImage = typeof category?.image === 'object' ? category?.image : null
  const icon = typeof category.icon === 'object' ? category.icon : null

  return (
    <article className="rounded-xl shadow-lg bg-white w-full h-full relative mt-8">
      <div
        className={`flex flex-col w-full h-full ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      >
        {/*Image Side of Category Card*/}
        <Image
          src={categoryImage?.url ?? ''}
          overrideSrc={categoryImage?.url ?? ''}
          alt={categoryImage?.altText ?? ''}
          width={categoryImage?.width ?? 0}
          height={categoryImage?.height ?? 0}
          placeholder="blur"
          loading={'eager'}
          blurDataURL={category?.imageBase64 ?? ''}
          className={`w-full lg:w-1/2 min-h-full object-cover rounded-t-xl lg:rounded-t-none rounded-b-none ${index % 2 === 0 ? 'lg:rounded-l-xl' : 'lg:rounded-r-xl'}`}
        />
        {/*Text Side of Featured Card*/}
        <div className="flex-col p-5 w-full lg:w-1/2">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
              <div className={`flex items-center justify-center`}>
                <Image
                  src={icon?.url ?? ''}
                  alt={icon?.altText ?? ''}
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
