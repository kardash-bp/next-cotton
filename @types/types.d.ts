export type ProductType = {
  name: string
  price: number
  available: boolean
  description: string
  id?: string
  slug?: string
  imgUrl?: string
  quantity: number
  image?: File
}
export type UserType = {
  id?: string
  name?: string
  email: string
  password?: string
  resetPasswordToken?: string
  cartItems?: {
    id: string
    quantity: number
    pid: string
  }[]
}
export type SessionType = {
  id: string
  name: string
  email: string
  cartItems: {
    id: string
    quantity: number
    pid: string
  }[]

}
export type ItemType = { pid: string; qty: number }

export default interface IFile {
  url: string,
  name: string,
}
export type CartItemType = {
  uid: string
  pid: string
  quantity: string
  price: number

}
export type CartContextType = { cartProducts: CartItemType[] | [], setCart: (data: CartItemType[]) => void, toggleCart: boolean, toggle: () => void, openCart: () => void, closeCart: () => void, setEmptyCart: () => void }