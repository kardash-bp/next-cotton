import styled from 'styled-components'

const NavStyles = styled.div`
  color: var(--offWhite);

  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  font-size: 1.3rem;
  letter-spacing: 0.125rem;

  button {
    width: 32px;
    height: auto;
    margin-inline: 1rem;
    background: none;
    color: var(--offWhite);
    border: 0;
    cursor: pointer;
  }
  a {
    color: var(--offWhite);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &.active {
      color: var(--yellow);
    }
    &:before {
      content: '';
      width: 2px;
      background: var(--lightgrey);
      height: 50%;
      left: 0;
      position: absolute;
      transform: translateY(12px) skew(-12deg);

      top: 0;
      bottom: 0;
    }
    &.non-active {
      &:after {
        height: 3px;
        background: var(--pink);
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2.2rem;
      }
      &:hover,
      &:focus,
      &:visited {
        outline-color: transparent;
        color: inherit;
        &:after {
          width: calc(100% - 30px);
        }
      }
    }
  }
`

export default NavStyles
