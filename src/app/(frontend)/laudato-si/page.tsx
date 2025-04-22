import { getPayload } from 'payload'
import configPromise from '@payload-config'
import LaudatoSiCard from '@/components/features/cards/laudato-si-card'

export const metadata = {
  title: "Laudato-Si' | Our Planet Earth",
  description:
    '"Laudato Si\'" is a 2015 encyclical by Pope Francis that focuses on care for the environment and all people, emphasizing the interconnectedness of humanity and nature.',
}

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
      <h1 className="text-blue-950 text-center my-4 h-20 text-4xl lg:text-8xl flex justify-center items-end z-10">
        Laudato Si Action Platform
      </h1>
      <div className="max-w-7xl mx-auto p-5 lg:p-0">
        {categories.map((category, idx) => (
          <div key={idx}>
            <LaudatoSiCard category={category} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LaudatoSiPage
