import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client"
import { CookiesProvider } from "react-cookie"
import { useApollo } from "../lib/apollo"

import "./normalize.css"
import "../node_modules/bulma/css/bulma.css"
import "./styles.css"

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <CookiesProvider>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <Component {...pageProps} />
        </SessionProvider>
      </CookiesProvider>
    </ApolloProvider>
  )
}
