import { useRouter } from 'next/router'
import UpdateProduct from '../components/UpdateProduct'

const UpdatePage = () => {
  const { query } = useRouter()
  const id = query.id as string
  return <UpdateProduct id={id} />
}

export default UpdatePage
