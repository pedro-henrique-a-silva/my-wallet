import { styled } from 'styled-components';

export const FormWalletForm = styled.form`
  align-items: center;
  background-color: ${(props) => props.theme.colors.blue400};
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem;
  min-width: 770px;
  padding:  1rem;
  box-shadow: 0px 0 6px 1px ${(props) => props.theme.colors.blue600};

  & input , select {
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0 5px -2px ${(props) => props.theme.colors.blue600};
    line-height: 1.5rem;
    margin: 0.5rem 0;
    padding: 0.2rem;

  }

  & input:active, select:active {
    outline: 2px solid ${(props) => props.theme.colors.blue600};
    box-shadow: 0px 0 6px 1px ${(props) => props.theme.colors.blue600};
  }

  & input:focus, select:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue600};
    box-shadow: 0px 0 6px 1px ${(props) => props.theme.colors.blue600};
  }

  & button {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray100};
    border: 2px solid ${(props) => props.theme.colors.gray500};
    border-radius: 6px;
    padding: 0.4rem 1rem;
  }

  & button:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.gray200};
  }

  & #value {
    width: 80px;
    margin-left: 0.2rem;
  }

  & #currency {
    margin-left: 0.2rem;
  }

  & #method {
    margin-left: 0.2rem;
  }

  & #tag {
    margin-left: 0.2rem;
  }

  & #description {
    margin-left: 0.2rem;
  }
`;
