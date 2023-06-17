import styled from 'styled-components'
type StyleTypes = {
  open?: true | false
}
const CartStyles = styled.div<StyleTypes>`
  background-color: rgba(0, 0, 0, 0.75);
 position: fixed;
 padding:2rem;
  top: 0;
  right: 0;
  bottom: 0;
  left:0;
  z-index: 5;
  display:flex;
  justify-content: end;
  transition: all 0.3s;
  transform:translateX(120%);
  ${(props) => props.open && 'transform: translateX(0);'} 
  & .modal {
  position:relative;
  width: 500px;
  min-width: 400px;
  padding: 20px;
  background-color:var(--lightgrey);
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index:10;

  
  }
  & div.close {
    position:absolute;
    top: 1rem;
    right:2rem;
    width: 32px;
    height: 32px;
    button {
      cursor: pointer;
      color:var(--navy);
      font-weight:700;

    }
 }
 header {
    border-bottom: 5px solid var()(--navy);
    border-radius: .3rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
 footer {
    border-top: 5px solid var(--navy);
    margin-top: 2rem;
    padding-top: 2rem;
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0;
    display:flex;
    justify-content: space-between;
    align-items: center;
      div {
        color:var(--navy)
      }
      button{
        width:auto;
        color:var(--navy);
        font-size:1.5rem;
        border: 1px solid var(--navy);
        padding-inline: .5rem;
       border-radius: 4px; 
       transition: all .25s ease-out;
       &:hover {
        color: var(--pink);
        border-color: var(--pink);
      }
    }
  }
 ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y:scroll;
  }
`

export default CartStyles
