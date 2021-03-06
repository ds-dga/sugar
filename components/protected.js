import { useEffect, useState } from "react"
import Error from "next/error"
import { useSession } from "next-auth/react"
import Layout from "./layout"
import AccessDenied from "./access-denied"

export default function Protected({ useLayout = true, children }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (loading || session === undefined) return <p>Loading...</p>
  // If no session exists, display access denied message
  let c = children
  if (!session) {
    c = <AccessDenied />
  }
  if (useLayout) {
    return <Layout>{c}</Layout>
  }
  return c
}
