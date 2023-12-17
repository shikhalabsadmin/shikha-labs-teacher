"use client"

import Image from "next/image"
import { collection, orderBy, query } from "firebase/firestore"
import { Loader } from "lucide-react"
import { useCollection } from "react-firebase-hooks/firestore"

import { db } from "@/config/firebase"

import { ResponseCard } from "./response-card"

const Responses = () => {
  const [responses, loading] = useCollection(
    query(collection(db, "responses"), orderBy("createdAt", "desc"))
  )

  return (
    <div className="self-center text-center ">
      <p className="text-left text-3xl font-bold">Chatbot Responses</p>
      {responses?.empty && (
        <div className="bg-accent mt-3 flex flex-col items-center justify-center rounded-lg pb-4">
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
      {loading && (
        <div className="flex h-[65vh] items-center justify-center">
          <Loader strokeWidth="3px" className="h-16 w-16 animate-spin" />
        </div>
      )}
      <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {responses?.docs.map((response) => (
          <ResponseCard
            key={response.id}
            id={response.id}
            response={response.data()}
          />
        ))}
      </ul>
    </div>
  )
}

export default Responses
