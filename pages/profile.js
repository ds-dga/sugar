import { useSession, signOut } from "next-auth/client"
import styles from "../components/header.module.css"
import Protected from "../components/protected"

export default function Profile() {
  const [session, loading] = useSession()
  let children = <p>Loading...</p>

  if (!loading) children = <UserInfo session={session} />

  return <Protected>{children}</Protected>
}

function UserInfo({ session }) {
  return (
    <>
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
            signOut()
          }}
        >
          Sign out
        </a>
      </div>
    </>
  )
}
