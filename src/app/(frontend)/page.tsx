import Hero from '@/components/features/home/hero'
import { Suspense } from 'react'
import FeaturedSection from 'src/components/features/articles/featured articles'
import RecentSection from 'src/components/features/articles/recent articles'
import { Skeleton } from '@/components/ui/skeleton'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <RecentSection />
    </div>
  )
}

export default HomePage
