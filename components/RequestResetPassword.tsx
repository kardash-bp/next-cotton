import { ChangeEvent, FormEvent, useState } from 'react'
import { FormStyles } from './styles/Form'
import { gql, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { toast } from 'react-toastify'

import { hash } from 'bcryptjs'
import { sendPasswordResetEmail } from '../lib/mail'
const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    cottonUser(where: { email: $email }) {
      id
    }
  }
`
const RESET_REQUEST = gql`
  mutation RequestReset($token: String!, $email: String!) {
    updateCottonUser(
      where: { email: $email }
      data: { resetPasswordToken: $token }
    ) {
      resetPasswordToken
    }
    publishCottonUser(where: { email: $email }) {
      id
    }
  }
`

const RequestResetPassword = () => {
  const [email, setEmail] = useState('')
  const [updateCottonUser, { data, loading, error }] =
    useMutation(RESET_REQUEST)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (email === '') return

    try {
      const { data } = await client.query({
        query: CHECK_EMAIL,
        variables: { email },
      })
      if (!data?.cottonUser) {
        toast.error('User does not exist.')
        return
      }
      const token = await hash(email, 8)
      const res = await updateCottonUser({ variables: { token, email } })
      const tokenResponse = res.data.updateCottonUser.resetPasswordToken
      if (tokenResponse) {
        // send email with reset link

        await sendPasswordResetEmail(tokenResponse, email)
        toast.success('Request has been sent. Check your email')
      }
      return
    } catch (err: any) {
      console.log(err.message)
      return toast.error('Something went wrong! ' + err.message)
    }
  }

  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <fieldset area-busy={'test'}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={email}
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

export default RequestResetPassword
