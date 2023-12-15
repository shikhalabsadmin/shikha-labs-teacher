"use client"

import { LogOut, User } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

interface UserNavProps {
  session: Session
}

const UserNav = ({ session }: UserNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-[17rem]">
        <DropdownMenuLabel className="pb-0">
          {session?.user?.name}
        </DropdownMenuLabel>
        <DropdownMenuItem className="pt-0">
          {session?.user?.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>TEACHER</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          <ThemeToggle />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <div onClick={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
