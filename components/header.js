import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/client"
import styles from "./header.module.css"
import HomeAltIcon from "./icon/home"
import SearchAltIcon from "./icon/search"
import Icon from "./icon"
import { CustomLinkWrapper } from "../lib/utils"
import ScreenIcon from "./icon/screen"

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession()

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <div className={[styles.flexy]}>
          <Link href="/" passHref>
            <CustomLinkWrapper>
              <Icon icon={HomeAltIcon} size={32} />
            </CustomLinkWrapper>
          </Link>
          {/* <Link href="/search">
            <CustomLinkWrapper>
              <Icon icon={SearchAltIcon} size={32} />
            </CustomLinkWrapper>
          </Link> */}
          {session && (
            <Link href="/profile">
              <CustomLinkWrapper>
                <Icon icon={ScreenIcon} size={32} />
              </CustomLinkWrapper>
            </Link>
          )}
          {/* {!session && (
            <div className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </div>
          )} */}
          {/* <div className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
            {!session && (
              <>
                <div>
                  <span className={styles.notSignedInText}>You are not signed in</span>
                </div>
                <div>
                  <a
                    href={`/api/auth/signin`}
                    className={styles.buttonPrimary}
                    onClick={(e) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Sign in
                  </a>
                </div>
              </>
            )}
            {session && (
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
            )}
          </div> */}
        </div>
      </div>
    </header>
  )
}
