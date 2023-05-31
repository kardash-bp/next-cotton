import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { ProductType } from '../@types/types'
import ItemStyles from './styles/ItemStyles'
import PriceTag from './styles/PriceTag'
import Title from './styles/Title'

const Product = ({ product }: { product: ProductType }) => {
  const { id, name, price, imgUrl, description } = product
  return (
    <ItemStyles>
      {imgUrl && (
        <Image
          src={imgUrl}
          width={400}
          height={400}
          alt='Product'
          loading='lazy'
        />
      )}
      <Title>
        <Link href={`/product/${id}`}>{name}</Link>
      </Title>
      <PriceTag>{price / 100} &euro;</PriceTag>
      <p>{description}</p>
    </ItemStyles>
  )
}

export default memo(Product)
