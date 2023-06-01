import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import React from 'react'
import DisplayError from './DisplayError'
import Loader from './Loader'
import styled from 'styled-components'
import Link from 'next/link'
import DeleteProduct from './DeleteProduct'
import Image from 'next/image'
import AddToCart from './AddToCart'
import { useSession } from 'next-auth/react'
const ProductStyles = styled.div`
  display: grid;
  gap: 1rem;
  min-height: 768px;
  max-width: var(--max-width);
  @media (min-width: 568px) {
    grid-template-columns: repeat(2, 1fr);
  }
  img {
    width: 90%;
    height: auto;
    object-fit: contain;
  }
  .buttonList {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    button {
      background: var(--red);
      color: white;
      border: transparent;
    }
    .productBtn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: 10rem;
      height: 3.5rem;
      font-size: 1.5rem;
      padding: 1rem;
      margin-bottom: 1rem;

      border-radius: 3px;
      cursor: pointer;
    }
    a,
    a:visited,
    a:active {
      color: #1da1f2;
      background: var(--offWhite);
      border: 1px solid #1da1f2;
    }
    a:hover {
      color: var(--grey);
    }
  }
`

export const SINGLE_PRODUCT_QUERY = gql`
  query SingleProduct($id: ID!) {
    product(where: { id: $id }) {
      name
      description
      price
      quantity
      imgUrl
      slug
    }
  }
`
const SingleProduct = ({ id }: any) => {
  const { data: session, status } = useSession()
  let { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  })
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <DisplayError error={error} />
  }
  const { name, price, description, imgUrl } = data?.product
  return (
    <ProductStyles>
      <Head>
        <title>NextCotton | {name}</title>
        <meta name='description' content={`... ${description}`} />
      </Head>

      <Image
        src={imgUrl ? imgUrl : '/static/placeholder.jpg'}
        alt={`product ${name}`}
        width={500}
        height={500}
      />
      <div>
        <div>
          <h2>{name}</h2>
          <p>{price / 100} &euro;</p>
          <p>{description}</p>
        </div>
        {session?.user && <AddToCart pid={id} user={session.user} />}
        {status === 'authenticated' && (
          <div className='buttonList'>
            <Link
              href={{
                pathname: '/update',
                query: {
                  id,
                },
              }}
              className='productBtn'
            >
              Edit{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-pencil'
                viewBox='0 0 16 16'
              >
                {' '}
                <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />{' '}
              </svg>{' '}
            </Link>
            <DeleteProduct id={id} cl={'productBtn'} />
          </div>
        )}
      </div>
    </ProductStyles>
  )
}

export default SingleProduct
