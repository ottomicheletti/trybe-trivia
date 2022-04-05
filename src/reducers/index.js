import { combineReducers } from 'redux';
// import trivia from './trivia';
import player from './player';
import token from './token';

const reducer = combineReducers({
  player,
  token,
  // trivia,
});

export default reducer;
