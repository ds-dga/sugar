import Layout from "../../components/layout"
import UptimeList from "../../components/UptimeList"

export default function Page() {
  return (
    <Layout>
      <h1 className="title has-text-centered">Uptime 🍧</h1>
      <UptimeList />
    </Layout>
  )
}
