import React from 'react'

import { UserType } from '../@types/types'
import styled from 'styled-components'
import Image from 'next/image'

const ButtonStyle = styled.button`
  width: 20rem;
  height: 4rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 3px;
  cursor: pointer;
  img {
    z-index: 99;
  }
  span.basket {
    position: relative;
    width: 35%;
  }
  span.text {
    width: 60%;
  }
`

const AddToCart = ({ pid, user }: { pid: string; user: UserType }) => {
  const handleClick = () => {}
  return (
    <ButtonStyle onClick={handleClick}>
      <span className='basket'>
        <Image src='/static/add-to-cart.png' fill alt='cart icon' />
      </span>
      <span className='text'> add to cart</span>
    </ButtonStyle>
  )
}

export default AddToCart
