"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { collection, getDocs } from "firebase/firestore"

import { db } from "@/config/firebase"

import { ResponseCard } from "./response-card"

const Responses = () => {
  const [responses, setResponses] = useState<any>([])

  const fetchResponses = async () => {
    const querySnapshot = await getDocs(collection(db, "responses"))
    let itemsArr: { id: string }[] = []

    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id })
    })
    setResponses(itemsArr)
  }

  useEffect(() => {
    fetchResponses()
  }, [])

  return (
    <div className="self-center text-center ">
      <p className="text-left text-3xl font-bold">Chatbot Responses</p>
      {responses.length === 0 && (
        <div className="mt-3 flex flex-col items-center justify-center rounded-lg bg-accent pb-4">
          <Image
            alt="You don't have any student responses yet."
            src="/create.svg"
            height={200}
            width={250}
            priority={false}
          />
          <p className="text-left text-lg font-medium tracking-tight">
            You don&apos;t have any student responses yet. Share the chatbot
            with the students.
          </p>
        </div>
      )}
      <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {responses.map((response: any) => (
          <ResponseCard key={response.id} response={response} />
        ))}
      </ul>
    </div>
  )
}

export default Responses
