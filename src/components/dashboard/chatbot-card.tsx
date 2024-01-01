"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { ExternalLink } from "lucide-react"
import { useCollection } from "react-firebase-hooks/firestore"
import { toast } from "sonner"

import { db } from "@/config/firebase"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChatbotOperations } from "@/components/dashboard/chatbot-operations"

import { ScrollArea } from "../ui/scroll-area"

async function copyToClipboard(value: string, meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value)
}

interface ChatbotCardProps {
  chatbot: DocumentData
  id: string
}

export function ChatbotCard({ chatbot, id }: ChatbotCardProps) {
  const shareCode = `https://shikha-labs-students.vercel.app/${id}`

  const date = new Date(chatbot?.createdAt?.toDate())

  const userTimezoneOffset = date.getTimezoneOffset() * 60000

  const userDate = new Date(date.getTime() + userTimezoneOffset)

  const formattedDate = userDate.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const [responses, setResponses] = useState<any>([])

  const fetchResponses = async (chatbotid: string) => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "responses"),
        where("chatbotId", "==", chatbotid),
        orderBy("createdAt", "desc")
      )
    )
    let itemsArr: { responseid: string }[] = []

    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), responseid: doc.id })
    })

    setResponses(itemsArr)
  }

  return (
    <article className="border-primary/80 flex rounded-md border-2 border-dashed">
      <div className="rotate-180 p-4 [writing-mode:_vertical-lr]">
        <time className="text-primary/50 flex items-center justify-between gap-2 text-xs font-bold">
          {/* <span>{formattedDate.substring(0, formattedDate.length - 4)}</span>
          <span className="w-px flex-1 bg-primary/20"></span>
          <span>{formattedDate.substring(formattedDate.length - 4)}</span> */}
          <span className="bg-primary/20 w-px flex-1"></span>
          <span>{formattedDate}</span>
          <span className="bg-primary/20 w-px flex-1"></span>
        </time>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="border-primary/10 grid grid-flow-col-dense grid-cols-3 border-l p-4 pb-0 text-left sm:border-l-transparent sm:px-4 sm:py-6 sm:pb-0">
          <div className="col-span-2 pr-3">
            <h2 className="text-xl font-bold capitalize sm:text-2xl">
              {chatbot?.chatbotName}
            </h2>

            <p className="text-muted-foreground mt-1 text-base/relaxed leading-5 tracking-tight">
              {chatbot?.description}
            </p>
            {chatbot?.tags && (
              <p className="text-primary/70 mt-1 text-base/relaxed leading-5 tracking-tight">
                Tags: {chatbot?.tags}
              </p>
            )}

            <div className="mt-5 flex gap-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      fetchResponses(id)
                    }}
                  >
                    Responses
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px]">
                  <DialogHeader>
                    <DialogTitle>View Responses</DialogTitle>
                    <DialogDescription>
                      Here are all the responses of the students conversed with
                      this chatbot.
                    </DialogDescription>
                  </DialogHeader>

                  {responses.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <div className="w-[850px]">
                          <TableRow>
                            <TableHead className="w-[200px]">
                              Student Name
                            </TableHead>
                            <TableHead className="w-[90px]">Grade</TableHead>
                            <TableHead className="w-[60px]">Roll No.</TableHead>
                            <TableHead className="w-[80px]">
                              Rating Score
                            </TableHead>
                            <TableHead className="w-[300px]">
                              Rating Summary
                            </TableHead>
                            {/* <TableHead className="text-right">View</TableHead> */}
                          </TableRow>
                        </div>
                      </TableHeader>
                      <TableBody>
                        <ScrollArea className="max-h-[70vh] rounded-md border">
                          {responses.map((response: any) => (
                            <TableRow key={response.responseid}>
                              <TableCell className="w-[200px] font-medium">
                                {response?.studentName}
                              </TableCell>
                              <TableCell className="w-[90px]">
                                {response?.studentGrade}
                              </TableCell>
                              <TableCell className="w-[60px]">
                                {response?.studentRollno}
                              </TableCell>
                              <TableCell className="w-[80px]">
                                {response?.convoRating.ratingScore}
                              </TableCell>
                              <TableCell className="w-[300px]">
                                <span className="text-sm">
                                  {response?.convoRating.ratingSummary.substring(
                                    0,
                                    90
                                  )}
                                </span>
                                ...
                              </TableCell>
                              <TableCell className="text-right">
                                <Button asChild>
                                  <Link
                                    href={`/dashboard/response/${response.responseid}`}
                                  >
                                    View{" "}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </ScrollArea>
                      </TableBody>

                      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
                    </Table>
                  ) : (
                    <div className="">Sorry, there are no responses yet.</div>
                  )}
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Share</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Share Chatbot</DialogTitle>
                    <DialogDescription>
                      Copy the code below to share the chatbot with the
                      students.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="w-[475px]">
                      <p className="bg-secondary mt-2 rounded-md p-4 opacity-90">
                        <code className="break-words">
                          <span>{shareCode}</span>
                        </code>
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        copyToClipboard(shareCode)
                        toast.info("Chatbot URL Copied!")
                      }}
                      className="w-full"
                    >
                      Copy Chatbot URL
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* <div className="col-span-1">
            <ChatbotOperations id={chatbot.id} />
          </div> */}

          <div className="col-span-1">
            <p className="text-primary/80 mt-1 text-lg font-bold leading-5 tracking-tight">
              {chatbot?.grade}
            </p>
            <p className="text-muted-foreground mt-1 text-base/relaxed font-medium leading-5 tracking-tight">
              {chatbot?.subject}
            </p>
          </div>
        </div>

        <div className="cursor-pointer sm:flex sm:items-end sm:justify-end">
          <Link href={`/dashboard/chatbot/${id}`}>
            <strong className="bg-primary text-background mb-[-2px] me-[-1px] inline-flex items-center gap-1 rounded-ee-md rounded-ss-md px-3 py-2">
              <span className="text-[10px] tracking-wide sm:text-sm">
                Visit
              </span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </strong>
          </Link>
        </div>
      </div>
    </article>
  )
}
