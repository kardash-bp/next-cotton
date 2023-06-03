import React from 'react'

import { UserType } from '../@types/types'
import styled from 'styled-components'

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

const AddToCart = ({ pid, user }: { pid: string; user: UserType }) => {
  const handleClick = () => {
    console.log('add to cart')
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

export default AddToCart
