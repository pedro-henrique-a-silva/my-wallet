import { useSelector } from 'react-redux';
import { ReduxState } from '../../types';

function Wallet() {
  const { email } = useSelector((state: ReduxState) => state.user);
  return <div>{email}</div>;
}

export default Wallet;
