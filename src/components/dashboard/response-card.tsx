"use client"

import { useState } from "react"
import Link from "next/link"
import { DocumentData, deleteDoc, doc } from "firebase/firestore"
import { ExternalLink, Loader, MoreVertical, Trash } from "lucide-react"
import { toast } from "sonner"

import { db } from "@/config/firebase"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

async function copyToClipboard(value: string, meta?: Record<string, unknown>) {
  navigator.clipboard.writeText(value)
}

interface ResponseCardProps {
  response: DocumentData
  id: string
}

export function ResponseCard({ response, id }: ResponseCardProps) {
  // const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  // const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const shareCode = `https://shikha-labs-teacher.vercel.app/dashboard/response/${id}`

  // const deleteResponse = async (responseID: string) => {
  //   setIsDeleteLoading(true)
  //   try {
  //     await deleteDoc(doc(db, "responses", responseID))

  //     setIsDeleteLoading(false)
  //     setShowDeleteAlert(false)
  //     toast.success("Response deleted successfully!")
  //     window.location.reload()
  //   } catch (error) {
  //     toast.error("Something went wrong. Please try again.")
  //   }
  // }

  const date = new Date(response?.createdAt?.toDate())

  const userTimezoneOffset = date.getTimezoneOffset() * 60000

  const userDate = new Date(date.getTime() + userTimezoneOffset)

  const formattedDate = userDate.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <article className="border-primary/80 flex rounded-md border-2 border-dashed">
      <div className="rotate-180 p-4 [writing-mode:_vertical-lr]">
        <time className="flex items-center justify-between gap-2 text-xs font-bold text-primary/50">
          <span className="w-px flex-1 bg-primary/20"></span>
          <span>{formattedDate}</span>
          <span className="w-px flex-1 bg-primary/20"></span>
        </time>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="border-primary/10 grid grid-flow-col-dense grid-cols-4 border-l p-4 pb-0 text-left sm:border-l-transparent sm:px-4 sm:py-6 sm:pb-0">
          <div className="col-span-2 pr-3">
            <h2 className="text-xl font-bold capitalize sm:text-2xl">
              {response?.studentName}
            </h2>

            <p className="text-muted-foreground mt-1 text-base/relaxed font-medium leading-5 tracking-tight">
              Roll No. {response?.studentRollno}
            </p>
            <p className="text-muted-foreground mt-1 text-base/relaxed font-medium leading-5 tracking-tight">
              {response?.studentGrade}
            </p>

            <div className="mt-5 flex gap-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Share</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Share Response</DialogTitle>
                    <DialogDescription>
                      Copy the code below to share the response with the other
                      teachers.
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
                        toast.info("Response URL Copied!")
                      }}
                      className="w-full"
                    >
                      Copy Response URL
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* <div className="col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto flex px-2"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive flex cursor-pointer items-center font-medium"
                  onSelect={() => setShowDeleteAlert(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
              open={showDeleteAlert}
              onOpenChange={setShowDeleteAlert}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this project?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteResponse(response.id)}
                    className={buttonVariants({ variant: "destructive" })}
                  >
                    {isDeleteLoading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="mr-2 h-4 w-4" />
                    )}
                    <span>Delete</span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div> */}

          <div className="col-span-2">
            <p className="text-primary/80 mt-1 text-lg font-bold leading-5 tracking-tight">
              {response?.chatbotDetails?.chatbotName}
            </p>
            <p className="text-muted-foreground mt-1 text-base/relaxed font-medium leading-5 tracking-tight">
              {response?.chatbotDetails?.description}
            </p>
          </div>
        </div>

        <div className="cursor-pointer sm:flex sm:items-end sm:justify-end">
          <Link href={`/dashboard/response/${id}`}>
            <strong className="bg-primary text-background mb-[-2px] me-[-1px] inline-flex items-center gap-1 rounded-ee-md rounded-ss-md px-3 py-2">
              <span className="text-[10px] tracking-wide sm:text-sm">Open</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </strong>
          </Link>
        </div>
      </div>
    </article>
  )
}
