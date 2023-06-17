import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { ProductType } from '../@types/types'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import Title from './styles/Title'
import AddToCartBtn from './AddToCart'
import { useUser } from '../hooks/useUser'
import { useSession } from 'next-auth/react'

const Product = ({ product }: { product: ProductType }) => {
  const { id, name, price, imgUrl, description } = product
  const authUser = useSession()
  return (
    <ItemStyles>
      {imgUrl && (
        <Image
          src={imgUrl}
          width={300}
          height={300}
          alt='Product'
          loading='lazy'
        />
      )}
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{price / 100} &euro;</PriceTag>
      <p>{description}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {authUser.status === 'authenticated' && (
          <AddToCartBtn pid={id!} price={price} user={authUser?.data?.user} />
        )}
      </div>
    </ItemStyles>
  )
}

export default memo(Product)
