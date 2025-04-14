import { Separator } from '@/components/ui/separator'
import { Author } from '@/payload-types'
import ImageWithBlur from '@/components/features/images/ImageWithBlur'

type AuthorProps = {
  author: Author
}

const AuthorCard = ({ author }: AuthorProps) => {
  const authorImage = typeof author.image === 'object' ? author.image : null

  return (
    <div className="rounded-xl shadow-lg bg-white w-full h-fit relative mt-8 lg:min-h-[620px]">
      <div
        className={`flex flex-col w-full h-full ${author.id % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      >
        <ImageWithBlur authorId={author.id} author={authorImage} />
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
