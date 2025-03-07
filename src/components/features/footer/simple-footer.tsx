'use client'

import { footerLinks } from '@/components/features/footer/footer-links'
import Link from 'next/link'

const SimpleFooter = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-around">
          <div className="w-1/3">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-white">
              We promote clean air, clean water, and healthy soils; a greener world; sustainable
              practices; renewable energy; and conservation of worldwide ecosystems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Our Planet Earth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SimpleFooter
