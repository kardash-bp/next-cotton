import { CartContext } from './cartContext'
import React, { ReactNode, useState } from 'react'

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [toggleCart, setToggleCart] = useState(false)
  function toggle() {
    setToggleCart(!toggleCart)
  }
  function openCart() {
    setToggleCart(true)
  }
  function closeCart() {
    setToggleCart(false)
  }
  return (
    <CartContext.Provider value={{ toggleCart, toggle, openCart, closeCart }}>
      {' '}
      {children}{' '}
    </CartContext.Provider>
  )
}
