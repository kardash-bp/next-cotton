import styled from 'styled-components'
import Image from 'next/image'
import { gql, useQuery } from '@apollo/client'
import Loader from './Loader'
import DisplayError from './DisplayError'
import { useEffect, useState } from 'react'

const CartItemStyles = styled.li`
  color: var(--navy);
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
    padding-inline: 1rem;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    span:last-child {
      color: var(--pink);
      font-weight: 600;
    }
  }
`

export const PRODUCT_QUERY = gql`
  query GetProduct($pid: ID!) {
    product(where: { id: $pid }) {
      id
      name
      price
      imgUrl
    }
  }
`

const CartItem = ({
  pid,
  qty,
  cb,
}: {
  pid: string
  qty: number
  cb: (t: number) => void
}) => {
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { pid },
  })
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (data?.product) {
      // const { name, price, imgUrl } = data?.product
      const sum = (+data.product.price / 100) * qty
      setTotal(sum)
    }
  }, [data?.product])

  useEffect(() => {
    cb(total)
  }, [total])

  if (loading) {
    return <Loader />
  }
  if (error) {
    return <DisplayError error={error} />
  }
  return (
    <CartItemStyles>
      {data?.product && (
        <>
          <Image
            src={data.product.imgUrl}
            width={100}
            height={100}
            alt='product photo'
          />
          <div>
            <h3>{data.product.name}</h3>
            <p>
              <span>
                {data.product.price / 100}&euro; &times; {qty}
              </span>
              <span> {(data.product.price * qty) / 100}&euro;</span>
            </p>
          </div>
        </>
      )}
    </CartItemStyles>
  )
}

export default CartItem
