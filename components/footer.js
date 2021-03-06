import Link from "next/link"
import packageInfo from "../package.json"

export default function Footer() {
  const { version, dependencies: dep } = packageInfo
  return (
    <footer className={"footer p-6"}>
      <div className="columns">
        <div className="column is-half"></div>
        <div className="column">
          <ul>
            <li><Link href="/">Home π </Link></li>
            <li><Link href="/sugar">Uptime π§</Link></li>
            <li><Link href="/sugar/icon">Icon πΆβπ«οΈ</Link></li>
            <li><Link href="/profile">Profile π€</Link></li>
          </ul>
        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          *** <em>v.{version}</em>
          <br />
          <small>
            Built with react@{dep.react}, nextjs@
            {dep.next}, next-auth@
            {dep["next-auth"]}
          </small>
        </div>
        {/* <div className="column">
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </div> */}
      </div>
    </footer>
  )
}
