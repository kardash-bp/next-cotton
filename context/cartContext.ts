import { createContext } from "react"
import { CartContextType } from "../@types/types"


const defaultState = { toggleCart: false, toggle: () => { }, openCart: () => { }, closeCart: () => { } }

export const CartContext = createContext(defaultState)