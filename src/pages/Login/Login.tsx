import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../redux/actions';
import {
  Wrapper,
  FormWrapper } from './style';

const INITIAL_FORM_VALUES = {
  email: '',
  pass: '',
};
function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validarEmail = (inputEmail: string) => {
    return regex.test(inputEmail);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate('/carteira');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const isEmailValid = validarEmail(formValues.email);
  console.log((formValues.pass.length >= 6 && isEmailValid));

  return (
    <Wrapper>
      <FormWrapper onSubmit={ handleSubmit }>
        <h2>Log in</h2>
        <input
          id="email"
          onChange={ handleChange }
          value={ formValues.email }
          data-testid="email-input"
          type="text"
          maxLength={ 50 }
          placeholder="Digite seu E-mail"

        />
        <input
          id="pass"
          onChange={ handleChange }
          value={ formValues.pass }
          data-testid="password-input"
          type="password"
          maxLength={ 50 }
          placeholder="Digite sua Senha"
        />
        <button
          disabled={ !(formValues.pass.length >= 6 && isEmailValid) }
          onClick={ () => dispatch(loginAction(formValues.email)) }
        >
          Entrar

        </button>
      </FormWrapper>
    </Wrapper>
  );
}

export default Login;
