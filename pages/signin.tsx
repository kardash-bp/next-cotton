import { useSession } from 'next-auth/react'
import React from 'react'
import RequestResetPassword from '../components/RequestResetPassword'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const SignInPage = () => {
  const { status } = useSession()
  console.log(status)
  return (
    <>
      <SignIn />
      <RequestResetPassword />
      <SignUp />
    </>
  )
}

export default SignInPage
