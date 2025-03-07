'use client'

import { usePathname } from 'next/navigation'
import CTAFooter from '@/components/features/footer/call-to-action-footer'
import SimpleFooter from '@/components/features/footer/simple-footer'

const Footer = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return <CTAFooter />
  } else if (pathname.startsWith('/articles/')) {
    return (
      <div className="max-w-6xl mx-auto ">
        <SimpleFooter />
      </div>
    )
  } else {
    return <SimpleFooter />
  }
}

export default Footer
