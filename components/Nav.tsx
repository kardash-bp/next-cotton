import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import NavStyles from './styles/NavStyles'
import Cart from './Cart'
import { useCart } from '../hooks/useCart'
import { useRouter } from 'next/router'
import { cartIcon } from '../assets/iconsSvg'

const Nav = () => {
  const { cartProducts, openCart } = useCart()
  const router = useRouter()
  const currentRoute = router.pathname
  const { data: session, status } = useSession()
  const { user } = session ? session : { user: undefined }
  return (
    <NavStyles>
      <Link
        href='/products'
        className={currentRoute === '/products' ? 'active' : 'non-active'}
      >
        Products
      </Link>
      {session ? (
        <>
          <Link
            href='/add'
            className={currentRoute === '/add' ? 'active' : 'non-active'}
          >
            add product
          </Link>
          <Link
            href='/orders'
            className={currentRoute === '/orders' ? 'active' : 'non-active'}
          >
            Orders
          </Link>
          <Link
            href='/account'
            className={currentRoute === '/account' ? 'active' : 'non-active'}
          >
            Account
          </Link>
          <Link
            href={`/profile/${user?.id}`}
            className={
              currentRoute.includes('/profile') ? 'active' : 'non-active'
            }
          >
            {user?.name}
          </Link>
          {status === 'authenticated' && (
            <>
              <Cart />
              <a onClick={() => signOut()}>Sign out</a>
              <button type='button' onClick={openCart}>
                {cartIcon} {cartProducts.length > 0 && cartProducts.length}
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <Link href='/api/auth/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  )
}

export default Nav
