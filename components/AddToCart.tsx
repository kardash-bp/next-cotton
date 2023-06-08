import React from 'react'
import { useUser } from '../hooks/useUser'

import { UserType, SessionType } from '../@types/types'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'
import Loader from './Loader'
import { useCart } from '../hooks/useCart'

const UPDATE_CART_MUTATION = gql`
  mutation UpdateCart($pid: String!, $quantity: String!) {
    updateCartItem(data: { quantity: $quantity }, where: { pid: $pid }) {
      quantity
      pid
      id
      uid
    }
    publishCartItem(where: { pid: $pid }) {
      uid
      pid
      quantity
    }
  }
`
const ADD_TO_CART_MUTATION = gql`
  mutation Add_To_Cart(
    $quantity: String!
    $pid: String!
    $uid: String!
    $email: String!
  ) {
    createCartItem(
      data: {
        quantity: $quantity
        pid: $pid
        uid: $uid
        reference: { connect: { CottonUser: { email: $email } } }
      }
    ) {
      quantity
      pid
      uid
    }
    publishCartItem(where: { pid: $pid }) {
      uid
      pid
      quantity
    }
  }
`

const AddToCartBtn = ({ pid, user }: { pid: string; user: UserType }) => {
  const { cartProducts, setCart } = useCart()
  const dbUser: SessionType = useUser(user.id!)
  const [updateCartItem, { error, loading }] = useMutation(UPDATE_CART_MUTATION)
  const [createCartItem, { error: addError, loading: addLoading }] =
    useMutation(ADD_TO_CART_MUTATION, {
      variables: { quantity: '1', pid, uid: user.id, email: user.email },
    })

  if (addLoading || loading) return <Loader />
  if (addError || error) {
    return <p>Error: {addError?.message || error?.message}</p>
  }
  console.log({ dbUser })
  const handleClick = async () => {
    const productInCart = dbUser.cartItems?.some((el) => el.pid === pid)
    console.log(productInCart)
    if (!productInCart) {
      console.log(productInCart, user)
      // const res = await createCartItem()
      // console.log(res.data.createCartItem)
      // const newCart = [...cartProducts, res.data.createCart]
      // setCart(newCart)
    } else {
      const product = dbUser?.cartItems?.find((p) => p.pid === pid)
      const qty = +product?.quantity! + 1
      const res = await updateCartItem({
        variables: { quantity: qty.toString(), pid },
      })
      console.log(res)
    }
  }
  return (
    <ButtonStyle onClick={handleClick}>
      <span className='basket'>
        <img src='/static/cart48.png' alt='cart icon' />
      </span>
      <span className='text'> add to cart</span>
    </ButtonStyle>
  )
}

export default AddToCartBtn

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12rem;
  font-size: 1.5rem;
  padding: 0.3rem 1rem;
  margin-bottom: 1rem;
  background-color: var(--lightgrey);
  border: 1px solid var(--greyViolet);
  border-radius: 3px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: var(--offWhite);
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  span.basket {
    width: 4rem;
    & img {
      width: 32px;
      height: auto;
    }
  }
  span.text {
    flex-grow: 1;
    text-align: center;
  }
`
