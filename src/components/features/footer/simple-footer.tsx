'use client'

import { footerLinks } from '@/components/features/footer/footer-links'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SimpleFooter = ({ className }: { className?: string }) => {
  return (
    <footer className={cn(`bg-green-900 text-secondary mt-4`, className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col justify-center w-full items-center gap-10 lg:flex-row lg:mb-4">
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-secondary">
              We promote clean air, clean water, and healthy soils; a greener world; sustainable
              practices; renewable energy; and conservation of worldwide ecosystems.
            </p>
          </div>
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-blue-300 transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Our Planet Earth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SimpleFooter
