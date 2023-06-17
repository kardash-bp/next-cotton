import { createContext } from "react"
import { CartContextType } from "../@types/types"


const defaultState = { cartProducts: [], setCart: (data) => [{ ...data }], addToCart: () => [], toggleCart: false, toggle: () => { }, openCart: () => { }, closeCart: () => { }, setEmptyCart: () => { } } as CartContextType

export const CartContext = createContext(defaultState)