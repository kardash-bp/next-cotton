import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`

export const FormStyles = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    color: var(--greyViolet);
    display: block;
    margin-bottom: 1rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid var(--grey);
    border-radius: 0.3rem;
    &:focus {
      outline: 0;
      border-color: var(--pink);
    }
  }
  input[type='file']::file-selector-button {
    background: var(--grey);
    color: var(--offWhite);
    border: 0;
    border-radius: 3px;
    font-size: 1.6rem;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
  }
  div.formBtn {
    display: flex;
    gap: 2rem;
    align-items: center;
    button {
      background: var(--grey);
      color: var(--offWhite);
      border: 0;
      border-radius: 3px;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
      cursor: pointer;
    }
    button[type='submit'] {
      background-color: var(--pink);
    }
    a,
    a:visited,
    a:focus {
      color: var(--grey);
      transition: all 0.2s ease-in;
    }
    a:hover {
      color: black;
      transform: scale(1.05);
    }
  }

  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 5px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        var(--greyViolet) 0%,
        var(--offWhite) 50%,
        var(--greyViolet) 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`
