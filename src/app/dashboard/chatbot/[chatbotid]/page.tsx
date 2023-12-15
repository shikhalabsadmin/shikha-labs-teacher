import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/config/authOptions"
import ChatbotView from "@/components/dashboard/chatbot-view"

interface PageProps {
  params: {
    chatbotid: string
  }
}

export default async function Page({ params }: PageProps) {
  const { chatbotid } = params

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return <ChatbotView chatbotid={chatbotid} />
}
