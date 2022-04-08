import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { saveScore, saveToken, saveAssertions } from '../actions';
import Header from './components/Header';
import './Jogo.css';
import handleClassName from '../helpers/index';

const dificuldade = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const Jogo = (props) => {
  const dispatch = useDispatch();
  const localToken = localStorage.getItem('token');
  const [localState, setLocalState] = useState({
    loading: true,
    trivia: [],
    triviaIndex: 0,
    category: null,
    difficulty: null,
    question: null,
    correctAnswer: null,
    incorrectAnswers: [],
    randomAnswers: [],
    hasClickedAnAnswer: false,
    timer: 30,
    score: 0,
    assertions: 0,
  });
  const {
    loading,
    trivia,
    triviaIndex,
    category,
    difficulty,
    question,
    correctAnswer,
    incorrectAnswers,
    randomAnswers,
    hasClickedAnAnswer,
    timer,
    score,
    assertions,
  } = localState;
  const QUATRO = 4;
  const DEZ = 10;
  const MIL = 1000;

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
        difficulty: results[triviaIndex].difficulty,
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
        difficulty: json.results[triviaIndex].difficulty,
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
    const {
      history: { push },
    } = props;

    switch (true) {
    case triviaIndex < QUATRO:
      return setLocalState((prevState) => ({
        ...prevState,
        triviaIndex: triviaIndex + 1,
        category: trivia[triviaIndex + 1].category,
        difficulty: trivia[triviaIndex + 1].difficulty,
        question: trivia[triviaIndex + 1].question,
        correctAnswer: trivia[triviaIndex + 1].correct_answer,
        incorrectAnswers: trivia[triviaIndex + 1].incorrect_answers,
        hasClickedAnAnswer: false,
        timer: 30,
      }));
    case triviaIndex === QUATRO:
      return push('./feedback');
    default:
      break;
    }
  };

  const countdown = () => {
    switch (true) {
    case !hasClickedAnAnswer && timer > 0:
      return setLocalState((prevState) => ({ ...prevState, timer: timer - 1 }));
    case timer === 0:
      return setLocalState((prevState) => ({
        ...prevState,
        timer: 0,
        hasClickedAnAnswer: true,
      }));
    default:
      break;
    }
  };

  const handleAnswerClick = ({ target: { value, id } }) => {
    clearInterval(countdown);
    setLocalState((prevState) => ({
      ...prevState,
      hasClickedAnAnswer: true,
    }));

    return id === correctAnswer
      ? setLocalState((prevState) => ({
        ...prevState,
        score: score + (DEZ + timer * value),
        assertions: assertions + 1,
      }))
      : null;
  };

  useEffect(() => {
    dispatch(saveScore(score));
    dispatch(saveAssertions(assertions));
  }, [score, assertions]);

  useEffect(() => {
    generateRandomAnswers();
  }, [correctAnswer, triviaIndex]);

  useEffect(() => {
    fetchTrivia();
  }, []);

  useEffect(() => {
    setTimeout(countdown, MIL);
  }, [timer]);

  return (
    <div>
      <Header />
      <div className="trivia-body">
        {loading ? (
          <p>CARREGANDO...</p>
        ) : (
          <div className="trivia-container">
            <h3 data-testid="question-category">{category}</h3>
            <h3 data-testid="question-text">{question}</h3>
            <div data-testid="answer-options" className="answer-options">
              {randomAnswers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  value={ dificuldade[difficulty] }
                  id={ answer }
                  data-testid={
                    answer === correctAnswer
                      ? 'correct-answer'
                      : `wrong-answer-${incorrectAnswers.indexOf(answer)}`
                  }
                  className={ `answer-buttons-${handleClassName(
                    answer,
                    hasClickedAnAnswer,
                    correctAnswer,
                  )}` }
                  disabled={ hasClickedAnAnswer }
                  onClick={ handleAnswerClick }
                >
                  {answer}
                </button>
              ))}
              <p>{timer}</p>
            </div>
          </div>
        )}
        <button
          className="next-trivia-btn"
          data-testid="btn-next"
          type="button"
          hidden={ !hasClickedAnAnswer }
          onClick={ nextTrivia }
        >
          Next
        </button>
      </div>
    </div>
  );
};

Jogo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Jogo;
