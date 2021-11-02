import { gql, useQuery, useLazyQuery } from "@apollo/client"
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
  // console.log("UptimeList: error: ", error)
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
            <LastFewHistory id={item.id} />
          </Box>
        )
      })}
    </Container>
  )
}

function LastFewHistory({ id }) {
  const [getHistory, { loading, error, data }] = useLazyQuery(LAST_FEW_TRIES, {
    variables: { ID: id },
  })
  const [Items, SetItems] = useState([])

  useEffect(() => {
    if (loading) return
    if (data) {
      SetItems(data.items)

      setTimeout(() => {
        SetItems([])
      }, 5000)
    } else {
      SetItems([])
    }
  }, [data, loading])

  if (!id) {
    return <></>
  }
  return (
    <>
      {Items.length === 0 && (
        <button
          className="button is-small is-text"
          onClick={() => {
            getHistory()
          }}
        >
          History
        </button>
      )}
      {Items.length > 0 && (
        <FlexRow>
          {Items.map((i) => (
            <HistoryItem
              key={`h-${id}-${i.created_at}`}
              className={`tag ${i.status_code > 500 ? "is-danger" : "is-success"} `}
              title={`${dayjs(i.created_at).format("MMM, D H:mm:ss")} / ${i.response_time_ms.toFixed(1)} ms`}
            >
              {i.status_code}
            </HistoryItem>
          ))}
        </FlexRow>
      )}
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

const HistoryItem = styled.span`
  margin: 0 5px;
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

const LAST_FEW_TRIES = gql`
  query LAST_FEW_TRIES($ID: uuid!) {
    items: api_stats(where: { api_id: { _eq: $ID } }, limit: 5, order_by: { created_at: desc }) {
      status_code
      response_time_ms
      size_byte
      created_at
    }
  }
`
