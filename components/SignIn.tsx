import { FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { FormStyles } from './styles/Form'
import useSignForm, { init } from '../hooks/useSignForm'

import { hashPassword } from '../lib/hashPassword'
const SignIn = () => {
  const { inputs, handleChange, resetForm } = useSignForm(init)
  const { email, password } = inputs
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    const hashedPassword = hashPassword(password)
    signIn('credentials', {
      email: inputs.email,
      password,
      // The page where you want to redirect to after a
      // successful login
      callbackUrl: `${window.location.origin}/`,
    })
  }

  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <fieldset area-busy={'test'}>
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
          <button type='submit'>Sign In</button>
          <button type='button' onClick={resetForm}>
            Reset
          </button>
        </div>
      </fieldset>
    </FormStyles>
  )
}

export default SignIn
