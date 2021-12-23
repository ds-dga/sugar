import { useSession, signOut } from "next-auth/react"
import styled from "styled-components"
import BetterDropZone from "../components/better-drop-zone"
import styles from "../components/header.module.css"
import MyFile from "../components/my-file"
import Protected from "../components/protected"

export default function Profile() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  let children = <p>Loading...</p>

  if (!loading)
    children = (
      <>
        <UserInfo session={session} />
        <TwoCol>
          <MyFile />
          <BetterDropZone />
        </TwoCol>
      </>
    )

  return <Protected>{children}</Protected>
}

function UserInfo({ session }) {
  return (
    <>
      <section className="section">
        <div>
          {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} className={styles.avatar} />}
          <span className={styles.signedInText}>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email || session.user.name}</strong>
          </span>
        </div>
        <div>
          <a
            href={`/api/auth/signout`}
            className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              signOut({ session })
            }}
          >
            Sign out
          </a>
        </div>
      </section>
    </>
  )
}

const TwoCol = styled.div`
  display: flex;
  flex-direction: row;

  section {
    flex: 1;
  }
`
