import Link from 'next/link'
import React from 'react'
import Nav from './Nav'
import styled from 'styled-components'
const Logo = styled.h1`
  display: inline-block;
  background-color: var(--red);
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  color: var(--offWhite);
  font-size: 3rem;
  margin-left: 2rem;
  text-transform: uppercase;
  padding: 0.5rem;
  letter-spacing: 0.055rem;
  line-height: 1.2;
  border-radius: 0.5rem;
`
const HeaderStyle = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--black);
  .bar {
    height: 8rem;
    width: 100%;
    max-width: 1280px;
    margin: auto;
  }
  .sub-bar {
    width: 100%;
    max-width: 1280px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr auto;
  }
`
const Header = () => {
  return (
    <HeaderStyle>
      <div className='bar'>
        <Link href='/'>
          <Logo>Next Cotton</Logo>
        </Link>
      </div>
      <div className='sub-bar'>
        {' '}
        <Nav />
      </div>
      <div className='sub-bar'>search</div>
    </HeaderStyle>
  )
}

export default Header
