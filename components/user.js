import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { useEffect, useState } from "react"

export default function UserProvider() {
  const [state, setState] = useState({
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    profile_url: null,
    loading: true,
    roles: [],
    isMod: false,
    isGod: false,
  })
  const { data, loading } = useQuery(USER_QUERY)
  useEffect(() => {
    if (!data) return
    let n = {
      ...state,
      loading,
    }
    if (data) {
      n = {
        ...n,
        ...data.auth_user[0],
        roles: data.auth_user[0].groups.map((g) => g.group.name),
      }
      n['isMod'] = n.roles.includes('mod')
      n['isGod'] = n.roles.includes('god')
    }
    if (n.id) setState(n)
  }, [data, loading])

  return state
}

const USER_QUERY = gql`
  query USER_QUERY {
    auth_user {
      id
      username
      first_name
      last_name
      email
      profile_url
      groups: user_groups {
        group {
          name
        }
      }
    }
  }
`