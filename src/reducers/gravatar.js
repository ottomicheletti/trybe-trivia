import { SAVE_GRAVATAR } from '../actions';

const gravatar = (state = null, action) => {
  switch (action.type) {
  case SAVE_GRAVATAR:
    return action.payload;
  default:
    return state;
  }
};

export default gravatar;
