import { SAVE_EMAIL, SAVE_USER, SAVE_SCORE, SAVE_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: null,
  assertions: 0,
  score: 0,
  gravatarEmail: null,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_USER:
    return {
      ...state,
      name: action.payload,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SAVE_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
