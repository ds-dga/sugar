import React from "react"
import { useSession } from "next-auth/react"
import { gql, useQuery } from "@apollo/client"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone" // dependent on utc plugin
import styled from "styled-components"
dayjs.extend(utc)
dayjs.extend(timezone)

export default function MyFile() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const {
    data,
    loading: qLoading,
    error: qError,
  } = useQuery(MY_FILE_QUERY, {
    skip: !session,
    pollInterval: 10 * 1000,
  })

  const zero = data && data.items.length === 0

  return (
    <section className="section">
      {qLoading && <p>Loading ...</p>}
      {zero && <p>There is no file yet</p>}
      {data &&
        data.items.map((row) => (
          <div className="card" key={row.id}>
            <div className="card-content">
              {row.name}
              <br />
              <SM>
                {(row.size / (1024 * 1024)).toFixed(1)} MB ⏱ {dayjs(row.created_at).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm")}
              </SM>
            </div>
          </div>
        ))}
    </section>
  )
}

const SM = styled.div`
  font-size: 0.8rem;
  color: #888888;
`

const MY_FILE_QUERY = gql`
  query MY_FILE_QUERY {
    items: media(order_by: { created_at: desc }) {
      id
      name
      size
      created_at
    }
  }
`
