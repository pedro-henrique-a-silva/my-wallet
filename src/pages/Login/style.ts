import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormWrapper = styled.form`
  background-color: ${(props) => props.theme.colors.blue400};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 4rem 2.5rem 4rem;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 1px 0 10px -3px ${(props) => props.theme.colors.black};

  & h2 {
    margin-bottom: 0.5rem;
  }

  & input {
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0 5px -2px ${(props) => props.theme.colors.blue600};
    line-height: 1.5rem;
    margin: 0.5rem 0;
    padding: 0.2rem;

  }

  & input:active {
    outline: 2px solid ${(props) => props.theme.colors.blue600};
    box-shadow: 0px 0 6px 1px ${(props) => props.theme.colors.blue600};
  }

  & input:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue600};
    box-shadow: 0px 0 6px 1px ${(props) => props.theme.colors.blue600};
  }

  & button {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray100};
    border: 2px solid ${(props) => props.theme.colors.gray500};
    border-radius: 6px;
    margin-top: 1rem;
    padding: 0.5rem 4.5rem;
  }


  & button:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.gray200};
  }

`;
