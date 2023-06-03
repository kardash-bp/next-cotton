import styled from 'styled-components'

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin-block: 2rem;
  background-color: var(--lightgrey);
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
  }
  a {
    position: relative;

    &:visited,
    &:focus,
    &:active {
      color: inherit;
    }
    &:after {
      height: 2px;
      background: var(--pink);
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2.5rem;
    }
    &:hover {
      outline-color: transparent;
      color: var(--grey);
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`

export default PaginationStyles
