import { getProviders, getSession, signIn } from "next-auth/client"

export default function SignIn({ providers }) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        ))}
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  const session = await getSession(context)
  if (session)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  return {
    props: { providers },
  }
}
