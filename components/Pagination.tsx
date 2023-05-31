import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { PER_PAGE } from '../config'
import DisplayError from './DisplayError'
import Loader from './Loader'
import PaginationStyles from './styles/PaginationStyles'

export const TOTAL_COUNT_PRODUCTS = gql`
  query {
    productsConnection {
      aggregate {
        count
      }
    }
  }
`

const Pagination = ({ page }: { page: number }) => {
  const { loading, error, data } = useQuery(TOTAL_COUNT_PRODUCTS)

  const totalProductsCount = data?.productsConnection?.aggregate.count as number

  const pageCount = Math.ceil(totalProductsCount / PER_PAGE)

  if (loading) return <Loader />
  if (error) return <DisplayError error={error} />
  return (
    <PaginationStyles>
      <Link href={`/products/${+page - 1}`} aria-disabled={+page <= 1}>
        {' '}
        &#8592; Prev
      </Link>
      <p>
        Page {page} of {pageCount} page{pageCount > 1 && 's'}{' '}
      </p>
      <p>{totalProductsCount} Items Total </p>
      <Link href={`/products/${+page + 1}`} aria-disabled={+page >= pageCount}>
        {' '}
        Next &#8594;
      </Link>
    </PaginationStyles>
  )
}

export default Pagination
