import { gql, useQuery } from "@apollo/client";
import Loader from '../components/Loader';
import DisplayError from '../components/DisplayError';
const CURRENT_USER_QUERY = gql`
  query CurrentUser($id: ID!) {
    cottonUser(where: {id:$id}){
      id
      name
      email
      cartItems {
      id
      quantity
      pid
      }
    }
  }
`

export function useUser(userId: string) {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    variables: { id: userId }
  })
  if (loading) {
    return loading
  }
  if (error) return error

  return data.cottonUser
}