import React, { forwardRef } from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Logo from '../logo'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { UserButton } from '@/components/features/buttons/user-button'
import { SignedOut } from '@/components/features/auth/signed-out'
import { SignedIn } from '@/components/features/auth/signed-in'
import { HandCoins, Store, UserIcon } from 'lucide-react'

const Navbar = async () => {
  return (
    <header className="max-w-7xl mx-auto flex items-center justify-between py-2 sm:px-6 lg:px-8">
      {/*For Mobile View*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:hidden mx-4">
            {' '}
            <HamburgerMenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-100 bg-white mx-4">
          <DropdownMenuLabel>Blog Articles</DropdownMenuLabel>
          <DropdownMenuSeparator className="w-full bg-black/50 mx-auto" />
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="text-xs hover:bg-green-200">
              Article of the Month
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-green-200">
              Our Planet Earth Articles
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-green-200">
              Laudato Si Information
            </DropdownMenuItem>
            <DropdownMenuSeparator className="w-full bg-black/50 mx-auto" />
          </DropdownMenuGroup>
          <DropdownMenuItem className="text-xs hover:bg-green-200">Sign In</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* End For Mobile View*/}

      <Logo />
      <NavigationMenu className="hidden md:flex gap-20 z-200 ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gray-100">Blog Articles</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 md:w-[400px] lg:w-[400px] z-100 bg-white flex items-center">
                <ListItem href="/articles" title="Articles" className="p-4 hover:bg-green-100">
                  The complete list of Our Planet Earth articles.
                </ListItem>
                <ListItem
                  className="p-4 hover:bg-green-100"
                  href="/laudato-si"
                  title="Learn More About Laudato Si"
                >
                  Learn more about the encyclical letter by Pope Francis.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <ListItem href="/team" title="Meet the Team" className="mt-2" />
        </NavigationMenuList>
        <NavigationMenuList className="gap-3">
          <SignedOut>
            <NavigationMenuItem>
              <Link href={'/auth/sign-in'}>
                <Button variant="outline" className="cursor-pointer hover:bg-green-100">
                  Log In
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={'/auth/sign-up'}>
                <Button
                  variant="outline"
                  className="hover:text-white text-white bg-green-800 hover:bg-green-700 cursor-pointer"
                >
                  Register
                </Button>
              </Link>
            </NavigationMenuItem>
          </SignedOut>

          <SignedIn>
            <NavigationMenuItem>
              <UserButton
                disableDefaultLinks={true}
                additionalLinks={[
                  // {
                  //   href: '/our-planet-earth-blog-shop',
                  //   label: 'Our Planet Earth Store',
                  //   signedIn: true,
                  //   icon: <Store />,
                  // },
                  { href: '/profile', label: 'User Profile', signedIn: true, icon: <UserIcon /> },
                  {
                    href: 'https://donate.stripe.com/test_bIY5nacC66fMeD65kk',
                    label: 'Donate',
                    signedIn: true,
                    icon: <HandCoins />,
                  },
                ]}
                classNames={{
                  base: 'text-secondary hover:cursor-pointer',
                  content: {
                    avatar: {
                      fallback: 'bg-green-950 text-secondary',
                      fallbackIcon: 'bg-green-950',
                    },
                    menuItem: 'hover:cursor-pointer',
                  },
                }}
              />
            </NavigationMenuItem>
          </SignedIn>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

export default Navbar
