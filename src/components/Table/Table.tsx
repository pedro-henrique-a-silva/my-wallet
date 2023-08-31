import { TableWrapper, TableHead } from './styles';

function Table() {
  return (
    <TableWrapper>
      <TableHead>
        <span>Descrição</span>
        <span>Tag</span>
        <span>Metodo de Pagamento</span>
        <span>Valor</span>
        <span>Moeda</span>
        <span>Cambio utilizado</span>
        <span>Valor Convertido</span>
        <span>Moeda de Conversão</span>
        <span>Editar ou Excluir</span>
      </TableHead>
    </TableWrapper>
  );
}

export default Table;
