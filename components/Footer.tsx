import React from 'react'
import styled, { css } from 'styled-components'

const media = {
  desktop: (props: any) => css`
    @media (min-width: 768px) {
      ${css(props)};
    }
  `,
}
const FooterStyle = styled.div`
  background-color: var(--greyViolet);
  text-align: center;
  color: var(--offWhite);
  margin-top: auto;
  padding: 0.5rem;
  & a:visited {
    color: inherit;
  }
  text-align: center;
  ${media.desktop`
    text-align: left;
  `}
`

const MenuWrapper = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  ${media.desktop`
    flex-wrap: nowrap;
    padding: 2.5rem 5rem;
    justify-content: space-between;
  `};
`
const Menu = styled.div`
  margin-bottom: 30px;
  min-width: 50%;
  ${media.desktop`
    min-width: unset;
    margin-bottom: 0;
    margin-right: 40px;
  `}
`

const MenuHead = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.11;
  color: var(--navy);
`

const MenuLink = styled.a`
  display: block;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 2;
  color: inherit;
  ${media.desktop`
    white-space: nowrap;
  `}
`
const Policy = styled.div`
  width: 100%;
  font-size: 1.3rem;
  line-height: 1.33;
  color: var(--lightgrey);
`

const PolicyRow = styled.p`
  margin: 0;
  padding: 0;
  padding: 1rem;
`
const menu = [
  {
    name: 'Projects',
    links: [
      {
        title: 'Bookstore',
        url: 'https://github.com/kardash-bp/bookstore-mern',
      },
      {
        title: 'Twitter Clone',
        url: 'https://github.com/kardash-bp/twitter-clone',
      },
      {
        title: 'Inventory Tracker',
        url: 'https://github.com/kardash-bp/inventory-tracker',
      },
      {
        title: 'Next Cotton',
        url: 'https://github.com/kardash-bp/next-cotton',
      },
    ],
  },
  {
    name: 'Links',
    links: [
      { title: 'Icons8', url: 'https://icons8.com' },
      { title: 'Help and Feedback', url: 'https://kardash-bp.github.io/' },
      { title: 'Terms and Condition', url: 'https://kardash-bp.github.io/' },
      { title: 'Privacy Policy', url: 'https://kardash-bp.github.io/' },
      { title: 'FAQ', url: 'https://kardash-bp.github.io/' },
    ],
  },
]
const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <FooterStyle>
      <MenuWrapper>
        {menu.map(({ name, links }) => (
          <Menu>
            <MenuHead>{name}</MenuHead>
            {links.map(({ title, url }) => (
              <MenuLink href={url} target='_blank'>
                {title}
              </MenuLink>
            ))}
          </Menu>
        ))}
        <Policy>
          {' '}
          <PolicyRow>{`Copyright ©  ${year} BobanPP`}</PolicyRow>{' '}
          <PolicyRow>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            saepe neque nisi modi quisquam praesentium odio ullam aliquid alias.
            Facere doloribus pariatur expedita laboriosam, sint accusamus
            voluptates consectetur velit, minus aliquid aperiam, dolorum eius
            quas necessitatibus nobis. Ad recusandae aspernatur inventore non
            aut vitae, dignissimos quae ratione delectus illo eligendi.
          </PolicyRow>{' '}
          <PolicyRow>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, neque
            deleniti sunt quaerat asperiores, sint quisquam nihil in omnis,
            maiores pariatur adipisci error aliquam laudantium ratione
            architecto voluptates officiis voluptas?
          </PolicyRow>
        </Policy>
      </MenuWrapper>
    </FooterStyle>
  )
}

export default Footer
