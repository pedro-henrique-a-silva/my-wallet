import { useSelector } from 'react-redux';
import { ReduxState } from '../../types';
import { HeaderContainer, UserLogged, TotalField } from './styles';

function Header() {
  const { email } = useSelector((state: ReduxState) => state.user);
  const { expenses } = useSelector((state: ReduxState) => state.wallet);
  return (
    <HeaderContainer>
      <h2>My Wallet</h2>
      <div>
        <UserLogged data-testid="email-field">{email}</UserLogged>
        <span>
          Total gastos:
          <TotalField data-testid="total-field">
            {(expenses.length > 0)
              ? expenses.reduce((total, expense) => {
                const askCurrencie = Number(expense.exchangeRates[expense.currency].ask);
                return total + (Number(expense.value) * askCurrencie);
              }, 0).toFixed(2)
              : '0.00'}
          </TotalField>
          <span data-testid="header-currency-field">BRL</span>
        </span>
      </div>
    </HeaderContainer>
  );
}

export default Header;
