import { doc, getDoc, setDoc } from "firebase/firestore"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/config/firebase"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      try {
        const { user } = params
        const userDocRef = doc(db, "teachers", user.id)
        const userDoc = await getDoc(userDocRef)

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            name: user.name,
            image: user.image,
          })
        }
        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    },
  },
}
