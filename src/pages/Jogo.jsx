import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveToken } from '../actions';
import Header from './components/header';

const Jogo = () => {
  const dispatch = useDispatch();

  // TOKEN ARMAZENADO NO LOCAL STORAGE
  const localToken = localStorage.getItem('token');

  // ESTADO LOCAL INICIAL
  const [localState, setLocalState] = useState({
    loading: true,
    trivia: [],
    triviaIndex: 0,
    category: null,
    // type: null,
    question: null,
    correctAnswer: null,
    incorrectAnswers: [],
    randomAnswers: [],
  });

  // DESCONSTROI ESTADO LOCAL PARA VARIÁVEIS
  const {
    loading,
    trivia,
    triviaIndex,
    category,
    // type,
    question,
    correctAnswer,
    incorrectAnswers,
    randomAnswers,
  } = localState;

  const fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await response.json();
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(saveToken(token));
  };

  const fetchTrivia = async () => {
    const response1 = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${JSON.parse(localToken)}`,
    );
    const json = await response1.json();
    console.log(`Response code: ${json.response_code}`);
    if (json.response_code !== 0) {
      fetchToken();
      const response2 = await fetch(
        `https://opentdb.com/api.php?amount=5&token=${JSON.parse(localToken)}`,
      );
      const { results } = await response2.json();
      setLocalState((prevState) => ({
        ...prevState,
        loading: false,
        trivia: results,
        category: results[triviaIndex].category,
        // type: results[triviaIndex].type,
        question: results[triviaIndex].question,
        correctAnswer: results[triviaIndex].correct_answer,
        incorrectAnswers: results[triviaIndex].incorrect_answers,
      }));
    } else {
      setLocalState((prevState) => ({
        ...prevState,
        loading: false,
        trivia: json.results,
        category: json.results[triviaIndex].category,
        // type: results[triviaIndex].type,
        question: json.results[triviaIndex].question,
        correctAnswer: json.results[triviaIndex].correct_answer,
        incorrectAnswers: json.results[triviaIndex].incorrect_answers,
      }));
    }
  };

  const generateRandomAnswers = () => {
    const randomIndex = Math.floor(Math.random() * trivia.length - 1);
    console.log(`Random Index: ${randomIndex}`);
    const RANDOM_ANSWERS = [...incorrectAnswers];
    RANDOM_ANSWERS.splice(randomIndex, 0, correctAnswer);

    setLocalState((prevState) => ({
      ...prevState,
      randomAnswers: RANDOM_ANSWERS,
    }));
  };

  const nextTrivia = () => {
    if (triviaIndex < trivia.length - 1) {
      setLocalState((prevState) => ({
        ...prevState,
        triviaIndex: triviaIndex + 1,
        category: trivia[triviaIndex + 1].category,
        // type: trivia[triviaIndex + 1].type,
        question: trivia[triviaIndex + 1].question,
        correctAnswer: trivia[triviaIndex + 1].correct_answer,
        incorrectAnswers: trivia[triviaIndex + 1].incorrect_answers,
      }));
    }
  };

  useEffect(() => {
    generateRandomAnswers();
  }, [correctAnswer, triviaIndex]);

  useEffect(() => {
    fetchTrivia();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {loading ? (
          <p>CARREGANDO...</p>
        ) : (
          <div>
            <h3 data-testid="question-category">{category}</h3>
            <h3 data-testid="question-text">{question}</h3>
            <div data-testid="answer-options">
              {randomAnswers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={
                    answer === correctAnswer
                      ? 'correct-answer'
                      : `wrong-answer-${incorrectAnswers.indexOf(answer)}`
                  }
                  // className={}
                  // onClick={}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button type="button" onClick={ nextTrivia }>
        Next
      </button>
    </div>
  );
};

export default Jogo;
