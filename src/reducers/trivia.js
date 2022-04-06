import { SAVE_TRIVIA } from '../actions';

const trivia = (state = null, action) => {
  switch (action.type) {
  case SAVE_TRIVIA:
    return action.payload;
  default:
    return state;
  }
};
export default trivia;
