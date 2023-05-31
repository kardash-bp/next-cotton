import { useRef, useState } from 'react'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CartItem from './CartItem'
import { SessionType } from '../@types/types'
import { useSession } from 'next-auth/react'
import { useCart } from '../hooks/useCart'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Cart = () => {
  const cartRef = useRef(null)
  const { closeCart, toggleCart } = useCart()
  const { data: session, status } = useSession()
  const { user } = session?.user ? session : { user: undefined }
  const authUser = user as SessionType
  const [totalToPay, setTotalToPay] = useState(0)
  const cart = authUser?.cartItems?.length > 0 ? authUser.cartItems : []
  const handleTotal = (total: number) => {
    setTotalToPay((prev) => prev + total)
  }
  useOutsideClick(cartRef, closeCart)
  return (
    <CartStyles open={toggleCart}>
      <div className='modal' ref={cartRef}>
        <div className='close'>
          <button type='button' onClick={closeCart}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <header>
          <Supreme>{user?.name}'s Cart</Supreme>
        </header>
        <ul>
          {cart.length &&
            cart.map((item: any, i: number) => {
              return (
                <CartItem
                  key={i}
                  pid={item.pid}
                  qty={item.quantity}
                  cb={handleTotal}
                />
              )
            })}
        </ul>
        <footer>
          <p>total: {totalToPay}&euro;</p>
        </footer>
      </div>
    </CartStyles>
  )
}

export default Cart
