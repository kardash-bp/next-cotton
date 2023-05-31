import SingleProduct from '../../components/SingleProduct'

const ProductPage = (props: any) => {
  const productId = props.query.id
  return <SingleProduct id={productId} />
}

export default ProductPage
