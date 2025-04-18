import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import LogoutButton from '@/components/features/buttons/logout'

const UserDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="cursor-pointer"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white z-10 text-center h-fit">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-black/20 w-full mx-auto" />
        <DropdownMenuItem className="cursor-pointer hover:bg-green-200 rounded-none">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-green-200 rounded-none">
          Products
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-green-200 rounded-none">
          Donations
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/20 w-full mx-auto" />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu
