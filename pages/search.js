import { useRouter } from "next/router"
import Link from "next/link"
import styled from "styled-components"
import Protected from "../components/protected"

export default function Page() {
  // const router = useRouter()
  return (
    <Protected>
      <h1>Search</h1>
    </Protected>
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
