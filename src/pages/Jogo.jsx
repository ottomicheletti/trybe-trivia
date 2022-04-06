import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveToken } from '../actions';
import Header from './components/header';

export const Jogo = () => {
  const [trivia, setTrivia] = useState({});
  const [triviaPosition, setTriviaPosition] = useState(0);
  const dispatch = useDispatch();
  const fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(saveToken(token));
  };

  useEffect(() => {
    const fetchTrivia = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${JSON.parse(token)}`);
      const object = await response.json();
      console.log(object);
      const CODE_ERROR = 3;
      if (object.response_code === CODE_ERROR) {
        fetchToken();
        const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${JSON.parse(token)}`);
        const object = await response.json();
        setTrivia(object);
      } else {
        setTrivia(object);
      }
    // localStorage.setItem('token', JSON.stringify(token));
    // dispatch(saveToken(token));
    };
    fetchTrivia();
  }, []);
  console.log(trivia);

  return (
    <div>
      <Header />
      <div>
      {trivia.results[triviaPosition].type === 'boolean' 
       ? (
       <div> 
        <h3 data-testid = "question-text"> {trivia.results[triviaPosition].question} </h3>
        <h3 data-testid = "question-category"> {trivia.results[triviaPosition].category} </h3>
          <button>verdadeiro</button>
          <button>falso</button>
        </div>)
       : () }
</div>
    </div>
  );
};

export default Jogo;
