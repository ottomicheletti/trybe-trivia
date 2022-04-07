import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  // saveScore,
  saveToken,
} from '../actions';
import Header from './components/header';
import './Jogo.css';

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
    // difficulty: null,
    question: null,
    correctAnswer: null,
    incorrectAnswers: [],
    randomAnswers: [],
    hasClickedAnAnswer: false,
    score: 0,
  });

  // DESCONSTROI ESTADO LOCAL PARA VARIÁVEIS
  const {
    loading,
    trivia,
    triviaIndex,
    category,
    // type,
    // difficulty,
    question,
    correctAnswer,
    incorrectAnswers,
    randomAnswers,
    hasClickedAnAnswer,
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
        // difficulty: results[triviaIndex].difficulty,
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
        // difficulty: json.results[triviaIndex].difficulty,
        question: json.results[triviaIndex].question,
        correctAnswer: json.results[triviaIndex].correct_answer,
        incorrectAnswers: json.results[triviaIndex].incorrect_answers,
      }));
    }
  };

  // FUNÇÃO PARA EMBARALHAR AS RESPOSTAS DA TRIVIA
  const generateRandomAnswers = () => {
    const randomIndex = Math.floor(Math.random() * trivia.length);
    console.log(`Random Index: ${randomIndex}`);
    const RANDOM_ANSWERS = [...incorrectAnswers];
    RANDOM_ANSWERS.splice(randomIndex, 0, correctAnswer);

    setLocalState((prevState) => ({
      ...prevState,
      randomAnswers: RANDOM_ANSWERS,
    }));
  };

  // FUNÇÃO QUE SERÁ IMPLEMENTADA NO BOTÃO NEXT NUM PRÓXIMO REQUISITO
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
        hasClickedAnAnswer: false,
      }));
    }
  };

  // FUNÇÃO PARA VERIFICAR QUANDO ALGUMA RESPOSTA DA TRIVIA É CLICADA
  const handleAnswerClick = () => {
    setLocalState((prevState) => ({
      ...prevState,
      hasClickedAnAnswer: true,
    }));
    // implementar lógica do SCORE { target: { value }} e comparar com correctAnswer
    // calcular a dificuldade e o tempo!
  };

  // FUNÇÃO PARA GERENCIAR OS NOMES DE CLASS DO CSS - REQUISITO 6 e 7
  const handleClassName = (answer) => {
    if (hasClickedAnAnswer) {
      return answer === correctAnswer ? 'correct' : 'wrong';
    }
    return null;
  };

  // CHAMA A FUNÇÃO generateRandomAnswers() TODA VEZ QUE HÁ UMA ATUALIZAÇÃO NOS ESTADOS correctAnswer e triviaIndex ( substitui o componentShouldUpdate() )
  useEffect(() => {
    generateRandomAnswers();
  }, [correctAnswer, triviaIndex]);

  // CHAMA A FUNÇÃO fetchTrivia() TODA VEZ QUE A PÁGINA Jogo.jsx É CARREGADA ( substitui o componentDidMount() )
  useEffect(() => {
    fetchTrivia();
  }, []);

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
                  value={ answer }
                  // ARRUMA O data-testid DINAMICAMENTE - REQUISITO 5
                  data-testid={
                    answer === correctAnswer
                      ? 'correct-answer'
                      : `wrong-answer-${incorrectAnswers.indexOf(answer)}`
                  }
                  className={ `answer-buttons-${handleClassName(answer)}` }
                  // SE ALGUMA RESPOSA FOR CLICADA, O ESTADO VIRA TRUE, FAZENDO COM QUE APENAS UMA RESPOSTA POSSA SER ESCOLHIDA - REQUISITO 6
                  disabled={ hasClickedAnAnswer }
                  onClick={ handleAnswerClick }
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="next-trivia-btn" type="button" onClick={ nextTrivia }>
          Next
        </button>
      </div>
    </div>
  );
};

export default Jogo;
