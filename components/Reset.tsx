import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FormStyles } from './styles/Form'
import { gql, useMutation, useQuery } from '@apollo/client'
import { client } from '../apolloClient'
import { toast } from 'react-toastify'
import { hashPassword } from '../lib/hashPassword'
import Loader from './Loader'
import DisplayError from './DisplayError'
import { hash } from 'bcryptjs'
import { signIn } from 'next-auth/react'
const CHECK_TOKEN = gql`
  query CheckToken($token: String!) {
    cottonUser(where: { resetPasswordToken: $token }) {
      email
    }
  }
`
const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!, $email: String!) {
    updateCottonUser(
      where: { email: $email }
      data: { password: $password, resetPasswordToken: "" }
    ) {
      id
      resetPasswordToken
    }
    publishCottonUser(where: { email: $email }) {
      id
    }
  }
`

const Reset = ({ token }: { token: string }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const { data: checkData } = useQuery(CHECK_TOKEN, {
    variables: { token },
  })
  useEffect(() => {
    if (checkData?.cottonUser?.email) {
      setEmail(checkData.cottonUser.email)
    }
  }, [token, checkData?.cottonUser?.email])

  const [updateCottonUser, { data, loading, error }] =
    useMutation(UPDATE_PASSWORD)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else {
      setConfirm(e.target.value)
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password === '') {
      toast.error('Password is required.')
      return
    }
    if (email === '') {
      toast.error('Email is required.')
      return
    }

    if (password !== confirm) {
      toast.error('Password & Confirm Password do not match')
      return
    }

    try {
      const hashedPassword = hashPassword(password)
      const res = await updateCottonUser({
        variables: { password: hashedPassword, email },
      })
      if (res.data.updateCottonUser.id) {
        signIn('credentials', {
          email,
          password,
          // The page where you want to redirect to after a
          // successful login
          callbackUrl: `${window.location.origin}/`,
        })
      }
      return res
    } catch (err: any) {
      console.log(err.message)
      return toast.error('Something went wrong! ' + err.message)
    }
  }
  if (loading) return <Loader />

  if (error) return <DisplayError error={error} />
  console.log(email, password)
  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Enter New Password</h2>
      <fieldset area-busy={'test'}>
        <label htmlFor='pass'>
          Password
          <input
            type='password'
            id='pass'
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='confirm'>
          Confirm Password
          <input
            type='password'
            id='confirm'
            name='confirm'
            placeholder='Repeat Password'
            value={confirm}
            onChange={handleChange}
          />
        </label>
        <div className='formBtn'>
          <button type='submit'>Send Request</button>
        </div>
      </fieldset>
    </FormStyles>
  )
}

export default Reset
