import { ChangeEvent, useRef, useState } from 'react'
import { ProductType } from '../@types/types'

export const init = {
  name: '',
  price: 0,
  quantity: 0,
  available: false,
  description: '',
  imgUrl: '',
  image: undefined,
}

export default function useForm(init: ProductType) {
  const [inputs, setInputs] = useState(init)
  const qtyRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => {
    if (e.target.type === 'file') {
      const selectedFile = e.target.files as FileList

      setInputs({ ...inputs, image: selectedFile[0] })
    } else if (e.target.name === 'price' || e.target.name === 'quantity') {
      setInputs({ ...inputs, [e.target.name]: +e.target.value })
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
  }
  function resetForm() {
    imgRef.current!.value = ''
    setInputs(init)
  }
  return { inputs, handleChange, resetForm, imgRef, priceRef, qtyRef }
}
