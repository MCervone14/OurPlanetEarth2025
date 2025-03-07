export interface Post {
  id: number
  title: string
  slug: string
  author: Array<string>
  publisherDate: Date
  featuredImage: Media
  categories: Array<string>
}

export interface Media {
  id: number
  title: string
  slug: string
  altText: string
  post: number
  prefix: string
  updatedAt: Date
  createdAt: Date
  url: string
  thumbnailURL: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
}
