import { useRouter } from 'next/router'
import React from 'react'
import Pagination from '../../components/Pagination'
import Products from '../../components/Products'

const products = () => {
  const { query } = useRouter()
  const page = +query.page! || 1
  return (
    <>
      <Products page={page} />
      <Pagination page={page || 1} />
    </>
  )
}

export default products
