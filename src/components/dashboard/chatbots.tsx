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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChatbotCard } from "@/components/dashboard/chatbot-card"

import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

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
]

const Chatbots = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedGrades, setSelectedGrades] = useState<any>([])
  const [selectedSubjects, setSelectedSubjects] = useState<any>([])

  const [chatbots, loading] = useCollection(
    query(collection(db, "chatbots"), orderBy("createdAt", "desc"))
  )

  const filteredChatbots = chatbots?.docs?.filter((chatbot: DocumentData) => {
    const data = chatbot.data()

    if (selectedGrades.length > 0 && selectedSubjects.length > 0) {
      return (
        selectedGrades.includes(data.grade) &&
        selectedSubjects.includes(data.subject) &&
        data.chatbotName.toLowerCase().includes(searchValue.toLowerCase())
      )
    } else if (selectedGrades.length > 0) {
      return (
        selectedGrades.includes(data.grade) &&
        data.chatbotName.toLowerCase().includes(searchValue.toLowerCase())
      )
    } else if (selectedSubjects.length > 0) {
      return (
        selectedSubjects.includes(data.subject) &&
        data.chatbotName.toLowerCase().includes(searchValue.toLowerCase())
      )
    } else if (searchValue) {
      return data.chatbotName.toLowerCase().includes(searchValue.toLowerCase())
    }
    return true
  })

  return (
    <div className="self-center text-center">
      <div className="flex flex-col items-center justify-between px-2">
        <div className="self-start text-3xl font-bold">Chatbot Apps</div>

        <div className="self-end">
          <div className="flex flex-row space-x-4">
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by the name of the chatbot..."
              className="w-[25vw]"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="text-lg">
                  Filter
                  <Filter className="ml-2 h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mr-8 w-[30rem]">
                <h1 className="pb-2 text-center text-xl font-bold">
                  Filter Chatbots
                </h1>
                <Separator />
                <div className="inline-flex w-full justify-between p-4">
                  <div className="w-[50%] border-r">
                    <h2 className="pb-2 text-center text-lg font-medium underline">
                      Grade
                    </h2>
                    <ul className="mr-2">
                      {grades.map((gradeValue: string, index: number) => (
                        <li
                          key={index}
                          onClick={() => {
                            if (selectedGrades.includes(gradeValue)) {
                              setSelectedGrades(
                                selectedGrades.filter(
                                  (g: string) => g !== gradeValue
                                )
                              )
                            } else {
                              setSelectedGrades([...selectedGrades, gradeValue])
                            }
                          }}
                          className="hover:bg-secondary flex cursor-pointer items-center justify-between rounded-md px-4 py-1"
                        >
                          <p>{gradeValue}</p>
                          {selectedGrades.includes(gradeValue) && <p>✔️</p>}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-[50%] pl-2">
                    <h2 className="pb-2 text-center text-lg font-medium underline">
                      Subject
                    </h2>
                    <ul>
                      {subjects.map((subjectValue: string, index: number) => (
                        <li
                          key={index}
                          onClick={() => {
                            if (selectedSubjects.includes(subjectValue)) {
                              setSelectedSubjects(
                                selectedSubjects.filter(
                                  (s: string) => s !== subjectValue
                                )
                              )
                            } else {
                              setSelectedSubjects([
                                ...selectedSubjects,
                                subjectValue,
                              ])
                            }
                          }}
                          className="hover:bg-secondary flex cursor-pointer items-center justify-between rounded-md px-4 py-1"
                        >
                          <p>{subjectValue}</p>
                          {selectedSubjects.includes(subjectValue) && <p>✔️</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Separator />
                <div className="flex pt-2">
                  <Button
                    variant="outline"
                    className="mx-auto h-8"
                    onClick={() => {
                      setSelectedGrades([])
                      setSelectedSubjects([])
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {filteredChatbots?.length === 0 && (
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
        <div className="flex h-[65vh] items-center justify-center">
          <Loader strokeWidth="3px" className="h-16 w-16 animate-spin" />
        </div>
      )}

      <ul className="mx-auto mt-5 grid max-w-2xl grid-cols-2 gap-6 lg:mx-0 lg:max-w-none lg:gap-8">
        {filteredChatbots?.map((chatbot: DocumentData) => (
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
