import { combineReducers } from 'redux';
// import trivia from './trivia';
import userReducer from './user';

const reducer = combineReducers({
  userReducer,
  // trivia,
});
export default reducer;
