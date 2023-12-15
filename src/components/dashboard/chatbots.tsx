"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { collection, getDocs } from "firebase/firestore"

import { db } from "@/config/firebase"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"

const Chatbots = () => {
  const [chatbots, setChatbots] = useState<any>([])

  const fetchChatbots = async () => {
    const querySnapshot = await getDocs(collection(db, "chatbots"))
    let itemsArr: { id: string }[] = []

    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id })
    })
    setChatbots(itemsArr)
  }

  useEffect(() => {
    fetchChatbots()
  }, [])

  return (
    <div className="self-center text-center ">
      <p className="text-left text-3xl font-bold">Chatbot Apps</p>
      {chatbots.length === 0 && (
        <div className="bg-accent mt-3 flex flex-col items-center justify-center rounded-lg pb-4">
          <Image
            alt="You don't have any chatbots yet."
            src="/create.svg"
            height={200}
            width={250}
            priority
          />
          <p className="text-left text-lg font-medium tracking-tight">
            You don&apos;t have any chatbot yet. Create a chatbot to get
            started.
          </p>
        </div>
      )}
      <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {chatbots.map((chatbot: any) => (
          <ChatbotCard key={chatbot.id} chatbot={chatbot} />
        ))}
      </ul>
    </div>
  )
}

export default Chatbots
