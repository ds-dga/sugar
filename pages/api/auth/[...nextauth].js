import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt_decode from "jwt-decode"

export default (req, res) => NextAuth(req, res, options)

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      name: "spice",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // console.log("spice - authorize [1]", credentials, req)
        const res = await fetch("https://ds.10z.dev/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        })
        // console.log("spice - authorize [2]", res)
        const token = await res.json()
        if (token.result !== "success") {
          return null
        }
        const user = jwt_decode(token.jwt)
        // console.log("spice - authorize [3]", user)
        // If no error and we have user data, return it
        if (user) {
          return {
            ...user,
            social: { provider: "spice" },
            token: token.jwt,
            name: user.uid,
          }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  pages: {
    // signIn: "/auth/signin", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(" signIn[00]: ", account)
    //   console.log(" signIn[01]: ", user)
    //   console.log(" signIn[02]: ", profile)
    //   console.log(" signIn[03]: ", email)
    //   console.log(" signIn[04]: ", credentials)
    //   return true
    // },
    // async redirect(url, baseUrl) { return baseUrl },
    async session({ session, user, token }) {
      /* console.log(" session[00]: ", token)
      console.log(" session[01]: ", user)
      console.log(" session[02]: ", session) */
      // define what'll be available via get/useSession()
      session.social = token.social
      if (session.social.provider === "credentials") {
        session.user.name = session.user.email
      }
      // console.log(" session[end]: ", session)
      return session
    },
    async jwt({ token, account }) {
      /* console.log(" jwt[00]: ", token)
      console.log(" jwt[01]: ", account) */
      let social = token.social || {}
      if (account) {
        social = {
          provider: account.provider,
          id: account.providerAccountId || token.name,
        }
      }
      return {
        ...token,
        social,
      }
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  // events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
}
