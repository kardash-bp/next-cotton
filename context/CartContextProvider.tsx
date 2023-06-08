import { CartItemType } from '../@types/types'
import { CartContext } from './cartContext'
import React, { ReactNode, useState } from 'react'

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartItemType[] | []>([])
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
  function setCart(data: CartItemType[]) {
    setCartProducts(data)
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCart,
        toggleCart,
        toggle,
        openCart,
        closeCart,
      }}
    >
      {' '}
      {children}{' '}
    </CartContext.Provider>
  )
}
