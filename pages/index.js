import { useRouter } from "next/router"
import styled from "styled-components"
import Layout from "../components/layout"
import UptimeList from "../components/UptimeList"

export default function Page() {
  // const router = useRouter()
  return (
    <Layout>
      <h1 className="title has-text-centered">🏠</h1>
      {/* <UptimeList /> */}
    </Layout>
  )
}

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  h1,
  h2,
  h3 {
    display: inline-block;
    margin-right: 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    h1,
    h2,
    h3 {
      display: block;
      margin-right: 1rem;
    }
  }
`
