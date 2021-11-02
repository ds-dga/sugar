import { useRouter } from "next/router"
import styled from "styled-components"
import Layout from "../components/layout"
import UptimeList from "../components/UptimeList"

export default function Page() {
  // const router = useRouter()
  return (
    <Layout>
      <h1 className="title has-text-centered">Uptime</h1>
      <UptimeList />
    </Layout>
  )
}