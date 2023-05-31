import { products } from './data';
import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { onError } from "@apollo/client/link/error";
import { ENDPOINT, TOKEN } from './config';
import { paginationField } from './lib/paginationField';


const link = ENDPOINT
const token = TOKEN

const httpLink = new HttpLink({
  uri: link,

})
const authMiddleware = new ApolloLink((operation, forward) => {

  // add the authorization to the headers

  operation.setContext(({ headers = {} }) => ({

    headers: {

      ...headers,

      authorization: token ? `Bearer ${token}` : ''

    }

  }));


  return forward(operation);

})
const errorLink = onError(({ graphQLErrors, networkError, forward, operation }): any => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {

      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )

    }
    )
  }

  return forward(operation);

})

const appLink = from([authMiddleware, errorLink, httpLink])

export const client = new ApolloClient({
  // connectToDevTools: process.browser,

  link: appLink,
  cache: new InMemoryCache({
    addTypename: true,
    typePolicies: {
      Query: {
        fields: {
          // @ts-ignore
          products: paginationField(),
        }
      }
    }
  }),
})