"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import {
  Cloud,
  CreditCard,
  Filter,
  Github,
  Keyboard,
  LifeBuoy,
  Loader,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import { useCollection } from "react-firebase-hooks/firestore"

import { db } from "@/config/firebase"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"

const grades = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
]

const subjects = [
  "English",
  "Hindi",
  "Urdu",
  "Mathematics",
  "Science",
  "Social Science",
  "",
]

const Chatbots = () => {
  const [grade, setGrade] = useState<string>("")
  const [subject, setSubject] = useState<string>("")

  // const [loading, setLoading] = useState<boolean>(true)

  const [chatbots, loading] = useCollection(
    query(
      collection(db, "chatbots"),
      // or(and(where("grade", "==", grade), and(where("subject", "==", subject))))
      orderBy("createdAt", "desc")
    )
  )

  // const [chatbots, setChatbots] = useState<any>([])

  // const fetchChatbots = async () => {
  //   try {
  //     if (subject) {
  //       const querySnapshot = await getDocs(
  //         query(
  //           collection(db, "chatbots"),
  //           where("subject", "==", subject)
  //           // orderBy("createdAt", "desc")
  //         )
  //       )
  //       let itemsArr: { id: string }[] = []

  //       querySnapshot.forEach((doc) => {
  //         itemsArr.push({ ...doc.data(), id: doc.id })
  //       })
  //       setChatbots(itemsArr)
  //       setLoading(false)
  //     } else if (grade) {
  //       const querySnapshot = await getDocs(
  //         query(
  //           collection(db, "chatbots"),
  //           where("grade", "==", grade)
  //           // orderBy("createdAt", "desc")
  //         )
  //       )
  //       let itemsArr: { id: string }[] = []

  //       querySnapshot.forEach((doc) => {
  //         itemsArr.push({ ...doc.data(), id: doc.id })
  //       })
  //       setChatbots(itemsArr)
  //       setLoading(false)
  //     } else if (subject && grade) {
  //       const querySnapshot = await getDocs(
  //         query(
  //           collection(db, "chatbots"),
  //           where("subject", "==", subject),
  //           where("subject", "==", subject)
  //           // orderBy("createdAt", "desc")
  //         )
  //       )
  //       let itemsArr: { id: string }[] = []

  //       querySnapshot.forEach((doc) => {
  //         itemsArr.push({ ...doc.data(), id: doc.id })
  //       })
  //       setChatbots(itemsArr)
  //       setLoading(false)
  //     } else {
  //       const querySnapshot = await getDocs(
  //         query(collection(db, "chatbots"), orderBy("createdAt", "desc"))
  //       )
  //       let itemsArr: { id: string }[] = []

  //       querySnapshot.forEach((doc) => {
  //         itemsArr.push({ ...doc.data(), id: doc.id })
  //       })
  //       setChatbots(itemsArr)
  //       setLoading(false)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchChatbots()
  // }, [subject, grade])

  console.log("chatbots: ", chatbots)

  return (
    <div className="self-center text-center">
      <div className="flex flex-col justify-between items-center px-2">
        <div className="text-3xl font-bold self-start">Chatbot Apps</div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild className="self-end">
            <Button variant="outline" className="text-lg">
              Filter
              <Filter className="w-5 h-5 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 mr-8">
            <DropdownMenuLabel className="text-center">
              Filter Chatbots
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="inline-flex w-full justify-between p-4">
              <DropdownMenuGroup className="w-[45%]">
                <DropdownMenuLabel className="text-center underline">
                  Grade
                </DropdownMenuLabel>
                {grades.map((gradeValue: string) => (
                  <DropdownMenuItem onClick={() => setGrade(gradeValue)}>
                    {gradeValue}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuGroup className="border-l w-[45%] pl-2">
                <DropdownMenuLabel className="text-center underline">
                  Subject
                </DropdownMenuLabel>
                {subjects.map((subjectValue: string) => (
                  <DropdownMenuItem onClick={() => setSubject(subjectValue)}>
                    {subjectValue}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      {chatbots?.empty && (
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

      {loading && (
        <div className="flex justify-center h-[65vh] items-center">
          <Loader strokeWidth="3px" className="w-16 h-16 animate-spin" />
        </div>
      )}

      <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {chatbots?.docs?.map((chatbot: DocumentData) => (
          <ChatbotCard
            key={chatbot.id}
            id={chatbot.id}
            chatbot={chatbot.data()}
          />
        ))}
      </ul>
    </div>
  )
}

export default Chatbots
