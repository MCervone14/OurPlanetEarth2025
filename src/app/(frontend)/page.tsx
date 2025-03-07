import Hero from '@/components/features/home/hero'
import FeaturedSection from 'src/components/features/articles/featured articles'
import RecentSection from 'src/components/features/articles/recent articles'
import CTAFooter from '@/components/features/footer/call-to-action-footer'
import { headers } from 'next/headers'
import Link from 'next/link'

const HomePage = async () => {
  const headersList = await headers()
  console.log(headersList)
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <RecentSection />
    </div>
  )
}

export default HomePage
