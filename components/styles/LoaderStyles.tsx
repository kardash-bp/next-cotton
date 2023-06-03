import styled, { keyframes } from 'styled-components'

const animation = keyframes`
 0% {
    top: 46px;
    left: 46px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 46px;
    left: 46px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 46px;
    left: 46px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 92px;
    height: 92px;
    opacity: 0;
  }
  `
export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  text-align: center;
  div {
    position: absolute;
    border: 4px solid var(--pink);
    opacity: 1;
    border-radius: 50%;
    animation: ${animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`
