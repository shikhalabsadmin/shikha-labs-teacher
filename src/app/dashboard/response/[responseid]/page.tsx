import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import ResponseView from "@/components/dashboard/response-view"

interface PageProps {
  params: {
    responseid: string
  }
}

export default async function Page({ params }: PageProps) {
  const { responseid } = params

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <ResponseView responseid={responseid} />
}
