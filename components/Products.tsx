import { gql, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { PER_PAGE } from '../config'
import { ProductType } from '../@types/types'
import Product from './Product'
export const ALL_PRODUCTS_QUERY = gql`
  query GetProducts($skip: Int = 0, $first: Int!) {
    products(skip: $skip, first: $first) {
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
  @media (min-width: 80rem) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 4rem;
  }
`

const Products = ({ page }: { page: number }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: (page - 1) * PER_PAGE,
      first: PER_PAGE,
    },
  })
  if (loading) return <p>Loading...</p>
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
