import { combineReducers } from 'redux';
// import trivia from './trivia';
import player from './player';
import token from './token';
import gravatar from './gravatar';

const reducer = combineReducers({
  player,
  token,
  gravatar,
  // trivia,
});

export default reducer;
