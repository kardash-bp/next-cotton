import styled from 'styled-components'
type StyleTypes = {
  open?: true | false
}
const CartStyles = styled.div<StyleTypes>`
  
  background-color: rgba(0,0,0,0.7);;
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
  background-color:var(--offWhite);
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
      color:red;
      font-weight:700;

    }
 }
 header {
    border-bottom: 5px solid var()(--black);
    border-radius: .3rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
 footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
     p {
      margin: 0;
      color:var(--black)
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
