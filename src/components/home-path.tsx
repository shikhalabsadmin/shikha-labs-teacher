"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const HomePath = () => {
  const pathname = usePathname()

  return (
    <>
      {pathname === "/" ? (
        <div className="flex items-center space-x-2">
          <span className="inline-block font-bold">Shikha Labs</span>
        </div>
      ) : (
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80">
          <span className="inline-block font-bold">Shikha Labs</span>
        </Link>
      )}
    </>
  )
}

export default HomePath
