import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image
          src="/uploads/our-planet-earth-logo.svg"
          alt="Logo by Freepik"
          width={160}
          height={160}
          className="bg-cover bg-center rounded-full cursor-pointer"
        />
      </Link>
      <h6
        className={cn(
          `hidden lg:block text-lg transform -translate-y-10 text-blue-700 opacity-80`,
          className,
        )}
      >
        Our Journey to Care for Our Planet Earth!
      </h6>
    </div>
  )
}

export default Logo
