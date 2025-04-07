'use client'

import { usePathname } from 'next/navigation'
import CTAFooter from '@/components/features/footer/call-to-action-footer'
import SimpleFooter from '@/components/features/footer/simple-footer'

const Footer = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return <CTAFooter className="max-w-7xl mx-auto" />
  } else if (pathname.startsWith('/articles/')) {
    return <SimpleFooter className="max-w-6xl mx-auto" />
  } else if (pathname.startsWith('/profile')) {
    return <SimpleFooter className="max-w-xl mx-auto rounded-t-xl" />
  } else {
    return <SimpleFooter />
  }
}

export default Footer
