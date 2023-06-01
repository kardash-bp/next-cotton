import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { PER_PAGE } from '../config'
import { ProductType } from '../@types/types'
import Product from './Product'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loader from './Loader'
export const ALL_PRODUCTS_QUERY = gql`
  query GetProducts($skip: Int = 0, $first: Int!) {
    products(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      name
      slug
      price
      quantity
      description
      imgUrl
    }
  }
`
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 48rem) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  @media (min-width: 48rem) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4rem;
  }
`

const Products = ({ page }: { page: number }) => {
  const router = useRouter()

  const { data, error, loading, refetch } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: (page - 1) * PER_PAGE,
      first: PER_PAGE,
    },
  })
  useEffect(() => {
    if (page <= 1) {
      refetch()
    }
  }, [])
  if (loading) return <Loader />
  if (error) return <p>Error: {error.message}</p>
  return (
    <ProductGrid>
      {data.products.map((p: ProductType) => (
        <Product product={p} key={p.id} />
      ))}
    </ProductGrid>
  )
}

export default Products
