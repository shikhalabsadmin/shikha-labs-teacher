"use client"

import { SessionProvider as Provider } from "next-auth/react"

type SessionProps = {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProps) {
  return <Provider>{children}</Provider>
}
