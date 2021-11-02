import { gql, useQuery, useSubscription } from "@apollo/client"
import { useEffect, useState } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export default function UptimeList() {
  const [Items, SetItems] = useState([])
  const { data, loading, error } = useQuery(LATEST_UPTIME_QUERY, {
    pollInterval: 15000,
  })

  useEffect(() => {
    if (loading) return
    if (data) {
      SetItems(data.items)
    } else {
      SetItems([])
    }
  }, [data, loading])
  console.log("UptimeList: error: ", error)
  return (
    <Container>
      {Items.map((item) => {
        let bg = null
        if (item.stats.length > 0) {
          const s = item.stats[0].status_code / 100
          if ([4, 5].includes(s)) {
            bg = "#f776bb44"
          } else if (s === 2) {
            bg = "#76f7bb44"
          }
        }
        const stats = item.stats.length > 0 ? item.stats[0] : null
        return (
          <Box key={item.id} background={bg}>
            {item.name}
            <br />
            {!stats && <p>-</p>}
            {stats && (
              <>
                <code>{stats.status_code}</code>
                <small>
                  {stats.response_time_ms.toFixed(1)} ms / {(stats.size_byte / 1024).toFixed()} kB
                </small>
                <small>{dayjs(stats.created_at).fromNow()}</small>
              </>
            )}
          </Box>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Box = styled.div`
  flex: 2 2 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin: 10px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: ${(props) => props.background || "#eaeaea"};
`

const LATEST_UPTIME_QUERY = gql`
  query LATEST_UPTIME_QUERY {
    items: api {
      id
      name
      url
      frequency
      stats(limit: 1, order_by: { created_at: desc }) {
        status_code
        response_time_ms
        size_byte
        created_at
      }
    }
  }
`
