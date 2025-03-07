import { getPayload } from 'payload'
import configPromise from '@payload-config'
import LaudatoSiCard from '@/components/features/laudato-si/laudato-si-card'

const GetCategoriesInfo = async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
  })

  return result.docs || null
}

const LaudatoSiPage = async () => {
  const categories = await GetCategoriesInfo()

  if (!categories) {
    return <div>No Categories were found!</div>
  }

  return (
    <div className="mx-auto flex-col lg:flex-row">
      <h1 className="text-green-700 text-center my-16 h-20 text-4xl lg:text-8xl flex justify-center items-end z-10">
        Laudato Si Action Platform
      </h1>
      <div className="">
        {categories.map((category) => (
          //@ts-ignore
          <LaudatoSiCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default LaudatoSiPage
