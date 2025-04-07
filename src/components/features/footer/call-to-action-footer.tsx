'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Logo from '@/components/features/header/logo'
import { footerLinks } from '@/components/features/footer/footer-links'
import { cn } from '@/lib/utils'

export default function CTAFooter({ className }: { className?: string }) {
  return (
    <footer className={cn(`w-full py-12 bg-green-50 mt-4`, className)}>
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">
            Our Journey to
            <br />
            Fight for Climate Change
          </h2>
          <div className="flex justify-center gap-4">
            <Link href={'/auth/sign-up'}>
              <Button size="lg" className="bg-blue-900 text-white cursor-pointer hover:bg-blue-800">
                Register
              </Button>
            </Link>
            <Link href="https://donate.stripe.com/test_bIY5nacC66fMeD65kk" target="_blank">
              <Button size="lg" className="bg-blue-900 text-white cursor-pointer hover:bg-blue-800">
                Donate
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="mx-auto">
            <h3 className="font-bold mb-4">NAVIGATION</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">WHAT WE DO</h3>
            <ul className="space-y-2">
              <li>
                We promote clean air, clean water, and healthy soils; a greener world; sustainable
                practices; renewable energy; and conservation of worldwide ecosystems.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <li>
                <Link href="mailto:OurPlanetEarth.eco@gmail.com" className="hover:underline">
                  OurPlanetEarth.eco@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t">
          <Logo className="text-blue-900 font-bold" />
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Our Planet Earth. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
