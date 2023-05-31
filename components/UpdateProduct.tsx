import { gql, useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'
import useForm, { init } from '../hooks/useForm'
import { ProductType } from '../@types/types'
import DisplayError from './DisplayError'
import { ALL_PRODUCTS_QUERY } from './Products'
import { SINGLE_PRODUCT_QUERY } from './SingleProduct'
import { FormStyles } from './styles/Form'

const UPDATE_PRODUCT_QUERY = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Int!
    $quantity: Int!
    $imgUrl: String!
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        quantity: $quantity
        imgUrl: $imgUrl
      }
    ) {
      id
      name
      description
      price
      quantity
      imgUrl
    }
    publishProduct(where: { id: $id }) {
      id
    }
  }
`
const updateCache = (cache: any, payload: any) => {
  cache.evict(cache.identify(payload.data.updateProduct))
}
const UpdateProduct = ({ id }: { id: string }) => {
  const router = useRouter()
  let { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })
  let { inputs, handleChange, resetForm, imgRef } = useForm(data?.product)
  const [updateProduct, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_PRODUCT_QUERY, {
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
        quantity: inputs.quantity,
        imgUrl: inputs.imgUrl,
      },
      update: updateCache,
    })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await updateProduct()
      console.log(res)
      toast.success('Product updated successfully.')
      router.push(`/product/${id}`)
    } catch (err: any) {
      console.error(err.message)
    }
  }
  return (
    <FormStyles onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} area-busy={updateLoading.toString()}>
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
            type='number'
            id='price'
            name='price'
            value={inputs.price}
            onChange={handleChange}
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
        <label htmlFor='imgUrl'>
          Image Link
          <input
            type='text'
            id='imgUrl'
            name='imgUrl'
            value={inputs.imgUrl}
            onChange={handleChange}
          />
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
        </label>
        <div className='formBtn'>
          <button type='button' onClick={resetForm}>
            Clear Form
          </button>
          <button type='submit' onClick={handleSubmit} disabled={loading}>
            + Update Product
          </button>
          <Link href={`/product/${id}`}>View Product Page</Link>
        </div>
      </fieldset>
    </FormStyles>
  )
}

export default UpdateProduct
