import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const validateInputs = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) && name !== null ? setBtnDisabled(false) : setBtnDisabled(true);
  }

  const handleChange = ({target: { value, name }}) => name === 'email'
    ? (setEmail(value), validateInputs())
    : (setName(value), validateInputs());

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
          data-testid="btn-play"
          disabled={ btnDisabled }
          // onClick={}
        >
          Play
        </button>
      </form>
    </div>
  )
}

export default Login;