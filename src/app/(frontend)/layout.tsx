import '../globals.css'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/features/header/navigation/navbar'
import Footer from '@/components/features/footer'
import { Roboto } from 'next/font/google'
import { Providers } from '@/components/features/providers/auth-provider'

export const metadata = {
  title: 'Home | Our Planet Earth',
  description:
    'We promote clean air, clean water, and healthy soils; a greener world; sustainable practices; renewable energy; and conservation of worldwide ecosystems.',
  openGraph: {
    images: '/uploads/our-planet-earth-logo.svg',
  },
}
const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <Providers>
        <body className="">
          <Navbar />
          <main className="max-w-7xl mx-auto">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </Providers>
    </html>
  )
}
