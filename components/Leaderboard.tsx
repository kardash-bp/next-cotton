import React from 'react'
import styled from 'styled-components'
const BannerStyles = styled.div`
  background-color: var(--green);
  width: 100%;
  height: 90px;
  margin-bottom: 4rem;
  text-align: center;
  border-radius: 0.8rem;
`
const Leaderboard = () => {
  return (
    <BannerStyles>
      <h1>Main Banner Place</h1>
    </BannerStyles>
  )
}

export default Leaderboard
