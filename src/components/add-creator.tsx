// "use client"

// import { useEffect } from "react"
// import { addDoc, collection, serverTimestamp } from "firebase/firestore"
// import { Session } from "next-auth"

// import { db } from "@/config/firebase"

// interface AddCreatorProps {
//   session: Session
// }

// const AddCreator = ({ session }: AddCreatorProps) => {
//   const addCreator = async () => {
//     await addDoc(collection(db, "teachers"), {
//       name: session?.user?.name,
//       email: session?.user?.email,
//       image: session?.user?.image,
//       createdAt: serverTimestamp(),
//     })
//   }

//   useEffect(() => {
//     addCreator()
//   }, [])

//   return <div className="hidden" />
// }

// export default AddCreator
