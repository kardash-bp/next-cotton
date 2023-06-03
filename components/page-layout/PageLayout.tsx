import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../Header'
import Leaderboard from '../Leaderboard'
import Footer from '../Footer'

interface PageProps {
  children: React.ReactNode
}
export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Roboto&display=swap');
:root {
  --pink: #a25bbf;
  --navy: #15304b;
  --grey: #9cabb4;
  --lightgrey: #d9e0e6;
  --offWhite: #efefef;
  --greyViolet: #695467;
  --yellow: #fff017;
  --maxWidth: 1280px;
  --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
}
html {
  box-sizing: border-box;
  font-size: 10px;
  }

*, *:before, *:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family:  'Roboto', sans-serif;
  font-weight: 400;
  color: var(--navy)
}
h1,h2,h3,h4 {
  font-family:'Oswald', sans-serif;
}
input,textarea,select {
  font-family: inherit;
}
:is(a:link,a:active,a:visited) {
  text-decoration: none;
}
button { all: unset; font-family:  'Roboto', sans-serif; }

`
const InnerStyle = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`

const PageLayout = ({ children }: PageProps) => (
  <>
    <Head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='NextJS Apollo' />
      <meta name='keywords' content='HTML, CSS, JavaScript, NextJS' />
      <meta name='author' content='BobanPP' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />
      <title>NextCotton</title>
      <link rel='icon' type='image/png' sizes='32x32' href='/static/fav.png' />
    </Head>
    <GlobalStyle />
    <Header />

    <InnerStyle>
      <Leaderboard />
      {children}
    </InnerStyle>
    <Footer />
  </>
)

export default PageLayout
