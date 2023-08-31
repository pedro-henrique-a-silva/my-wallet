import { useSelector, useDispatch } from 'react-redux';
import { NotePencil, X } from '@phosphor-icons/react';
import { TableWrapper, TableHead, TableRow, Button } from './styles';
import { ReduxState, Dispatch } from '../../types';
import { removeExpenseAction, changeToEditingModeAction } from '../../redux/actions';

function Table() {
  const dispatch: Dispatch = useDispatch();
  const { expenses } = useSelector((state: ReduxState) => state.wallet);

  const handleClick = (isEditMode: boolean, expenseId: number) => {
    dispatch(changeToEditingModeAction({ isEditMode, expenseId }));
  };

  return (
    <TableWrapper>
      <thead>
        <TableHead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </TableHead>
      </thead>
      <tbody>
        {(expenses.length > 0)
        && expenses.map((expense) => {
          const { ask, name } = expense.exchangeRates[expense.currency];
          return (
            <TableRow key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{name}</td>
              <td>{Number(ask).toFixed(2)}</td>
              <td>
                {(Number(expense.value) * Number(ask)).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <Button
                  isEdit
                  data-testid="edit-btn"
                  onClick={ () => handleClick(true, expense.id) }
                >
                  <NotePencil size={ 16 } weight="fill" />

                </Button>
                <Button
                  isEdit={ false }
                  onClick={ () => dispatch(removeExpenseAction(expense.id)) }
                  data-testid="delete-btn"
                >
                  <X size={ 16 } weight="fill" />

                </Button>
              </td>
            </TableRow>
          );
        })}
      </tbody>

    </TableWrapper>

  );
}

export default Table;
