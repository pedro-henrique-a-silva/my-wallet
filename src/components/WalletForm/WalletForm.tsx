import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormWalletForm } from './style';
import { addNewExpenseAction, editExpenseAction } from '../../redux/actions';
import { Dispatch, ReduxState } from '../../types';

const INITIAL_FORM_VALUES = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

function WalletForm() {
  const {
    expenses,
    currencies,
    isEditingMode,
    idToEdit } = useSelector((state: ReduxState) => state.wallet);

  const dispatch: Dispatch = useDispatch();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasEmptyField = Object.entries(formValues)
      .some((field) => field[1].length <= 0);

    if (!hasEmptyField && !isEditingMode) {
      dispatch(addNewExpenseAction({ ...formValues, id: expenses.length }));
    }

    if (!hasEmptyField && isEditingMode) {
      dispatch(editExpenseAction({ ...formValues, id: idToEdit }));
    }

    setFormValues(INITIAL_FORM_VALUES);
  };

  return (
    <FormWalletForm onSubmit={ handleSubmit }>
      <label htmlFor="">
        Valor:
        <input
          onChange={ handleInputChange }
          value={ formValues.value }
          data-testid="value-input"
          id="value"
          type="text"
          autoComplete="off"
        />
      </label>
      <label htmlFor="">
        Moeda:
        <select
          onChange={ handleInputChange }
          value={ formValues.currency }
          data-testid="currency-input"
          id="currency"
        >
          {(currencies.length > 0)
          && currencies.map((currencie) => (
            <option
              key={ currencie }
              value={ currencie }
            >
              {currencie}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="">
        Metodo:
        <select
          onChange={ handleInputChange }
          value={ formValues.method }
          data-testid="method-input"
          id="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="">
        Tag:
        <select
          onChange={ handleInputChange }
          value={ formValues.tag }
          data-testid="tag-input"
          name="tag"
          id="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      <label htmlFor="">
        Descrição:
        <input
          onChange={ handleInputChange }
          value={ formValues.description }
          data-testid="description-input"
          id="description"
          type="text"
          autoComplete="off"
        />
      </label>

      <button>{(isEditingMode ? 'Editar despesa' : 'Adicionar Despesa')}</button>
    </FormWalletForm>
  );
}

export default WalletForm;
