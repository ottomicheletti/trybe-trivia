import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  username: null,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
  case SAVE_USER:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
