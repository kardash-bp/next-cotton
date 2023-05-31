import { useContext } from "react"
import { CartContext } from "../context/cartContext"

export function useCart() {
  const all = useContext(CartContext)
  return all
}