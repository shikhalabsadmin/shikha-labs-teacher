import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import { buttonVariants } from "@/components/ui/button"
import SignInButton from "@/components/sign-in-button"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)

  return (
    <section className="h-full w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="bg-gradient-to-r from-white to-gray-900 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Shikha Labs Teacher
              </h1>
              <p className="mx-auto max-w-[600px] md:text-xl">
                View chatbots and student responses!
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              {session ? (
                <Link href="/dashboard" className={buttonVariants()}>
                  Visit Dashboard
                </Link>
              ) : (
                <SignInButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
