import { Separator } from '@/components/ui/separator'
import { Author } from '@/payload-types'
import Image from 'next/image'

type AuthorProps = {
  author: Author
  index: number
}

const AuthorCard = ({ author, index }: AuthorProps) => {
  const authorImage = typeof author.image === 'object' ? author.image : null

  return (
    <div className="rounded-xl shadow-lg bg-secondary w-full relative">
      <div className={`flex flex-col w-full h-full mb-8 lg:flex-row `}>
        <Image
          src={authorImage?.url ?? ''}
          overrideSrc={authorImage?.url ?? ''}
          alt={authorImage?.altText ?? ''}
          width={authorImage?.width ?? 0}
          height={authorImage?.height ?? 0}
          blurDataURL={author?.imageBase64 ?? ''}
          placeholder="blur"
          className={`w-full lg:w-1/2 h-full object-cover rounded-t-xl lg:rounded-t-none lg:rounded-l-xl`}
          loading={'eager'}
        />
        <div className="flex-col p-5 w-full">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col space-y-6">
              <div className={`flex items-center justify-center`}>
                <h2 className="text-5xl p-5">{author.name}</h2>
              </div>
              <Separator className="border-gray-300 border-[1px]" />
              <div className="flex flex-col space-y-6 p-5">
                <p className="text-gray-600 p-5 text-2xl">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
