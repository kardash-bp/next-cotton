import { useEffect } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { pathname, push } = Router
  const { data: session, status } = useSession()
  console.log(session?.user, status)
  useEffect(() => {
    if (pathname == '/') {
      push('/products')
    }
  }, [pathname])
  return <>Index</>
}
