import type { AppProps } from 'next/app'
import PageLayout from '../components/page-layout/PageLayout'
import NProgress from 'nprogress'
import { Router } from 'next/router'
import '../public/static/nprogress.css'
import { client } from '../apolloClient'
import { ApolloProvider } from '@apollo/client'
import { NextComponentType, NextPageContext } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CartContextProvider } from '../context/CartContextProvider'
import './page-loader.css'
NProgress.configure({ easing: 'ease', speed: 200, showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <CartContextProvider>
          <PageLayout>
            <ToastContainer autoClose={3000} />
            <Component {...pageProps} />
          </PageLayout>
        </CartContextProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
App.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: NextComponentType<NextPageContext, any, any>
  ctx: NextPageContext
}) {
  let pageProps: any = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  pageProps.query = ctx.query

  return { pageProps }
}
