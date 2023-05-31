import { ChangeEvent, useState } from 'react'
import { UserType } from '../@types/types'

export const init = {
  name: '',
  email: '',
  password: '',
}
export default function useSignForm(init: UserType) {
  const [inputs, setInputs] = useState(init)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    if (e.target.name === 'name' || e.target.name === 'email' || e.target.name === 'password') {
      setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
  }
  function resetForm() {
    setInputs(init)
  }
  return { inputs, handleChange, resetForm }
}
