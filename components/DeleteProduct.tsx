import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import DisplayError from './DisplayError'
import Loader from './Loader'
const DELETE_PRODUCT_QUERY = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`
const update = (cache: any, payload: any) => {
  cache.evict(cache.identify(payload.data.deleteProduct))
}
const DeleteProduct = ({ id, cl }: { id: string; cl: string }) => {
  const router = useRouter()
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_QUERY,
    {
      variables: { id },
      update,
    }
  )
  const handleClick = async () => {
    if (!confirm('Are you sure?')) return
    try {
      const res = await deleteProduct()
      toast.success(`Product deleted - id: ${id}`)

      router.push('/')
    } catch (err: any) {
      console.log({ err: err.message })
      toast.error('Something went wrong.')
    }
  }
  if (loading) return <Loader />
  if (error) return <DisplayError />
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cl}
      disabled={loading}
    >
      <span>Delete</span>{' '}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={16}
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-6 h-6'
      >
        <path
          fillRule='evenodd'
          d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
          clipRule='evenodd'
        />
      </svg>
    </button>
  )
}

export default DeleteProduct
