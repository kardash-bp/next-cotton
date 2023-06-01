import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export function useCart() {
  const cartData = useContext(CartContext)
  return cartData
}