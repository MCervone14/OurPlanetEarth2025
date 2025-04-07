import Hero from '@/components/features/home/hero'
import FeaturedSection from 'src/components/features/articles/featured articles'
import RecentSection from 'src/components/features/articles/recent articles'

const HomePage = async () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <RecentSection />
    </div>
  )
}

export default HomePage
