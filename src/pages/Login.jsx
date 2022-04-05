import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { saveEmail, saveToken, saveUser } from '../actions/index';

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();

  const validateInputs = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) && username !== null
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  };

  const handleChange = ({ target: { value, name } }) => (
    name === 'email'
      ? (setEmail(value), validateInputs())
      : (setUsername(value), validateInputs()));

  const fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    dispatch(saveToken(token));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await fetchToken();
    const hashedEmail = md5(email).toString();
    dispatch(saveEmail(hashedEmail));
    dispatch(saveUser(username));
    const { history: { push } } = props;
    push('/jogo');
  };

  return (
    <div>
      <form action="submit">
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            data-testid="input-gravatar-email"
            onChange={ handleChange }
            required
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ handleChange }
            required
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnDisabled }
          onClick={ handleClick }
        >
          Play
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
