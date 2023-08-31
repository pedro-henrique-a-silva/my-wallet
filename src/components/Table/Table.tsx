import { useSelector } from 'react-redux';
import { TableWrapper, TableHead, TableRow } from './styles';
import { ReduxState } from '../../types';

function Table() {
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
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
              <td>Editar ou Excluir</td>
            </TableRow>
          );
        })}
      </tbody>

    </TableWrapper>

  );
}

export default Table;
