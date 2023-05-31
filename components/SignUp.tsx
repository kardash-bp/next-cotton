import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FormStyles } from './styles/Form'
import useSignForm, { init } from '../hooks/useSignForm'
import { gql, useMutation } from '@apollo/client'
import { client } from '../apolloClient'
import { toast } from 'react-toastify'
import { hashPassword } from '../lib/hashPassword'
import bcrypt from 'bcryptjs'
import Loader from './Loader'
import DisplayError from './DisplayError'

const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    cottonUser(where: { email: $email }) {
      id
    }
  }
`
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createCottonUser(
      data: { name: $name, email: $email, password: $password }
    ) {
      id
    }
    publishCottonUser(where: { email: $email }) {
      id
    }
  }
`

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useSignForm(init)

  const [createCottonUser, { data, loading, error }] = useMutation(CREATE_USER)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputs.email || !inputs.password || !inputs.name) return

    try {
      const { data } = await client.query({
        query: CHECK_EMAIL,
        variables: { email: inputs.email },
      })
      if (data?.cottonUser) {
        toast.error('This email address is already in use.')
        return
      }
      const password = hashPassword(inputs.password)

      const res = await createCottonUser({
        variables: {
          name: inputs.name,
          email: inputs.email,
          password,
        },
      })
      console.log(res)
      if (!res.data.createCottonUser.id) {
        return toast.error('User has not been created!')
      }
      toast.success('Account registered successfully. Please login here.')
      signIn('credentials', {
        email: inputs.email,
        password: inputs.password,

        callbackUrl: `${window.location.origin}/`,
      })
      return
    } catch (err: any) {
      console.log(err.message)
      return toast.error('Something went wrong! ' + err.message)
    }
  }
  if (loading) return <Loader />

  if (error) return <DisplayError error={error} />
  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Register</h2>
      <fieldset area-busy={'test'}>
        <label htmlFor='email'>
          Username
          <input
            type='name'
            id='name'
            name='name'
            placeholder='Username'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='pass'>
          Password
          <input
            type='password'
            id='pass'
            name='password'
            placeholder='Password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <div className='formBtn'>
          <button type='submit'>Join</button>
          <button type='button' onClick={resetForm}>
            Reset
          </button>
        </div>
      </fieldset>
    </FormStyles>
  )
}

export default SignUp
