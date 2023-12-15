import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import HomePath from "@/components/home-path"
import UserNav from "@/components/user-nav"

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="mx-auto flex h-16 w-full items-center justify-between space-x-4 px-4 sm:px-12">
        <div className="flex gap-6">
          <HomePath />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session && <UserNav session={session} />}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
