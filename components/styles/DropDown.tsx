import styled, { keyframes } from 'styled-components'

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${(props) => props.theme.lightgrey};
`

const DropDownItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  background: white;
  padding: 1rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  border-left: 10px solid white;
  img {
    margin-right: 10px;
  }
`

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`

export { DropDown, DropDownItem, SearchStyles }
