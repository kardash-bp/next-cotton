import { UserType } from '../../../@types/types';
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from '@apollo/client';
import { client } from '../../../apolloClient';
import { compareSync } from 'bcryptjs'

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    cottonUser(where: { email: $email }) {
      id
      name
      email
      password
      cartItems {
        id
        quantity
        pid
      }
    }
  }
`

export const authOptions: NextAuthOptions = ({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      type: "credentials",

      //@ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials as { email: string, password: string }
        // Add logic here to look up the user from the credentials supplied
        const res = await client.query({
          query: GetUserByEmail, variables: { email }
        })
        const user = res.data.cottonUser as UserType

        if (user && compareSync(password, user.password!)) {
          // Any object returned will be saved in `user` property of the JWT

          const authUser = { id: user.id, email: user.email, name: user.name, cartItems: [...user.cartItems!] }

          return authUser
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null


        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as {
        id: string;
        name: string;
        email: string;
        cartItems: { id: string, quantity: number, pid: string }[]
      }
      return session
    },

  },
  pages: {
    signIn: "/signin", //Need to define custom login page (if using)
  },
})

export default NextAuth(authOptions);