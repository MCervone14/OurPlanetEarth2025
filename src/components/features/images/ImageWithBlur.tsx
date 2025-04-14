'use client'

import { Media } from '@/payload-types'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithBlurProps {
  featuredImage?: Media | null
  featuredBlurredImage?: Media | null
  articleId?: number | undefined
  authorId?: number | undefined
  author?: Media | null
  className?: string | undefined
}

const ImageWithBlur = ({
  featuredImage,
  featuredBlurredImage,
  className,
  articleId,
  authorId,
  author,
}: ImageWithBlurProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={featuredImage?.url || author?.url || ''}
        alt={featuredImage?.altText || author?.altText || ''}
        width={featuredImage?.width || author?.width || 0}
        height={featuredImage?.height || author?.height || 0}
        className={cn(
          `absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`,
          articleId &&
            ` ${articleId % 2 === 0 ? 'rounded-t-xl rounded-b-none rounded-l-xl lg:rounded-t-none lg:rounded-r-xl' : 'rounded-b-none rounded-t-xl lg:rounded-t-none lg:rounded-l-xl'}
          `,
          authorId &&
            `${author!.id % 2 === 0 ? 'rounded-r-xl' : 'rounded-l-xl'} lg:min-h-[620px] lg:max-w-[753px]`,
          className,
        )}
        loading="eager"
        onLoad={() => setIsLoaded(true)}
      />
      <img
        src={featuredBlurredImage?.url ?? ''}
        alt=""
        width={featuredBlurredImage?.width ?? 0}
        height={featuredBlurredImage?.height ?? 0}
        className={cn(
          'object-cover w-full h-full',
          articleId &&
            `${articleId % 2 === 0 ? 'rounded-t-xl rounded-b-none rounded-l-xl lg:rounded-t-none lg:rounded-r-xl' : 'rounded-b-none rounded-t-xl lg:rounded-t-none lg:rounded-l-xl'}`,
          authorId &&
            `${author!.id % 2 === 0 ? 'rounded-r-xl' : 'rounded-l-xl'} lg:min-h-[620px] lg:max-w-[753px]`,
          className,
        )}
        loading="eager"
        aria-hidden="true"
      />
    </div>
  )
}

export default ImageWithBlur
