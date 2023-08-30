import { AnyAction } from 'redux';
import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, actions: AnyAction) => {
  switch (actions.type) {
    case USER_LOGIN:
      return ({
        ...state,
        email: actions.payload,
      });
    default:
      return state;
  }
};

export default userReducer;
