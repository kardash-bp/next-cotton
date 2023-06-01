import { gql, useMutation } from '@apollo/client'
import { ChangeEvent, FormEvent, useState } from 'react'
import useForm, { init } from '../hooks/useForm'
import { FormStyles } from './styles/Form'
import DisplayError from './DisplayError'
import { ALL_PRODUCTS_QUERY } from './Products'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESET, PER_PAGE } from '../config'

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $name: String!
    $slug: String!
    $description: String!
    $price: Int!
    $quantity: Int!
    $imgUrl: String!
  ) {
    createProduct(
      data: {
        name: $name
        slug: $slug
        description: $description
        price: $price
        quantity: $quantity
        imgUrl: $imgUrl
      }
    ) {
      id
      name
      slug
      description
      price
      quantity
      imgUrl
    }
    publishManyProducts {
      count
    }
  }
`
const CreateProduct = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm, imgRef, priceRef, qtyRef } =
    useForm(init)
  let imgUrl = ''

  const { name, price, description, quantity, image } = inputs
  let slug = name
    .replace(/[^a-zA-Z0-9]+/g, '')
    .split(' ')
    .join('-')
    .toLocaleLowerCase()
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION
  )
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    //if (!name || !description) return

    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
    const imgData = new FormData()
    if (image) {
      imgData.append('file', image)
      imgData.append('upload_preset', CLOUDINARY_PRESET)
      const res = await fetch(url, {
        method: 'POST',
        body: imgData,
      })
      const dataRes = await res.json()
      imgUrl = dataRes.url
    }
    try {
      const res = await createProduct({
        variables: { ...inputs, slug, imgUrl },
        refetchQueries: [
          {
            query: ALL_PRODUCTS_QUERY,
            variables: { skip: 0, first: PER_PAGE },
          },
        ],
      })
      // console.log(res)
      resetForm()
      router.push(`/product/${res.data.createProduct.id}`)
    } catch (err: any) {
      console.log(err.message)
    }
  }
  if (error) {
    console.log(error)
  }
  //@ts-ignore
  const handleFocus = (inputRef) => inputRef.current?.select()
  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} area-busy={loading.toString()}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            ref={priceRef}
            type='number'
            id='price'
            name='price'
            value={inputs.price}
            onChange={handleChange}
            onFocus={() => handleFocus(priceRef)}
          />
        </label>
        <label htmlFor='qty'>
          Quantity
          <input
            type='number'
            id='qty'
            name='quantity'
            value={inputs.quantity}
            onChange={handleChange}
            onFocus={() => handleFocus(qtyRef)}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label htmlFor='img'>
          Image
          <input
            ref={imgRef}
            required
            type='file'
            id='img'
            name='image'
            onChange={handleChange}
          />
          {image && (
            <>
              <h4>Image Preview</h4>
              <Image
                src={URL.createObjectURL(image)}
                className={`w-[500px] h-[auto] rounded-xl ${
                  loading ? 'animate-ping' : ''
                }`}
                alt='Thumb'
                width={300}
                height={300}
              />
            </>
          )}
        </label>
        <div className='formBtn'>
          <button type='button' onClick={resetForm}>
            Clear Form
          </button>
          <button type='submit' onClick={handleSubmit}>
            + Add Product
          </button>
        </div>
      </fieldset>
    </FormStyles>
  )
}

export default CreateProduct
