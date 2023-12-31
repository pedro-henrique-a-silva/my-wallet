import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import WalletForm from '../../components/WalletForm/WalletForm';
import Table from '../../components/Table/Table';
import { Dispatch, ReduxState } from '../../types';
import { getCurrenciesAction } from '../../redux/actions';
import { WalletWrapper } from './style';

function Wallet() {
  const dispatch: Dispatch = useDispatch();
  const isFetching = useSelector((state: ReduxState) => state.wallet.isFatching);
  console.log(isFetching);

  useEffect(() => {
    dispatch(getCurrenciesAction());
  }, []);

  return (
    <>

      <Header />
      {(!isFetching)
        ? (
          <WalletWrapper>
            <WalletForm />
            <Table />
          </WalletWrapper>
        )
        : <p>Carregando...</p>}
    </>
  );
}

export default Wallet;
