import styled from 'styled-components'
import Image from 'next/image'
import { gql, useMutation, useQuery } from '@apollo/client'
import Loader from './Loader'
import DisplayError from './DisplayError'
import { UPDATE_CART_MUTATION } from './AddToCart'
import { useCart } from '../hooks/useCart'

const DELETE_CARTITEM_MUTATION = gql`
  mutation Del_CartItem($pid: String!) {
    deleteCartItem(where: { pid: $pid }) {
      pid
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

const CartItem = ({ pid, qty }: { pid: string; qty: number }) => {
  const { cartProducts, setCart } = useCart()
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { pid },
  })

  const [updateCartItem, { error: updError, loading: updLoading }] =
    useMutation(UPDATE_CART_MUTATION)
  const [deleteCartItem, { error: delError, loading: delLoading }] =
    useMutation(DELETE_CARTITEM_MUTATION, {
      variables: { pid },
    })

  const handleClick = async () => {
    if (+qty > 1) {
      const newQuantity = +qty - 1
      const res = await updateCartItem({
        variables: { quantity: newQuantity.toString(), pid },
      })
      const newState = cartProducts.map((p) =>
        p.pid === res.data.updateCartItem.pid ? res.data.updateCartItem : p
      )
      setCart(newState)
    } else {
      // del product from cart
      const res = await deleteCartItem()
      const newState = cartProducts.filter(
        (p) => p.pid !== res.data.deleteCartItem.pid
      )
      setCart(newState)
    }
  }

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
            <h3>
              {data.product.name}
              <button onClick={handleClick}>
                <Image
                  src='/static/remove.png'
                  alt='remove icon'
                  width={32}
                  height={32}
                />
              </button>
            </h3>
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

const CartItemStyles = styled.li`
  color: var(--navy);
  background-color: var(--offWhite);
  padding: 1rem;
  margin-bottom: 1rem;
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
