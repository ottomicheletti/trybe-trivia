import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import Header from './components/Header';

const Feedback = (props) => {
  const {
    history: { push },
  } = props;
  const { name, assertions, score, gravatarEmail } = useSelector((state) => state.player);
  const TRES = 3;
  const currentRanking = JSON.parse(localStorage.getItem('ranking'));
  console.log(currentRanking);
  const savePlayerToLocalStorage = () => (currentRanking === null
    ? localStorage.setItem(
      'ranking',
      JSON.stringify([{ name, assertions, score, gravatarEmail }]),
    )
    : (currentRanking.push({ name, assertions, score, gravatarEmail }),
    localStorage.setItem('ranking', JSON.stringify(currentRanking))));

  useEffect(() => {
    savePlayerToLocalStorage();
  });

  return (
    <div>
      <Header />
      <div>
        <h2 data-testid="feedback-text">
          {assertions < TRES ? 'Could be better...' : 'Well Done!'}
        </h2>
        <div className="buttons">
          <button type="button" data-testid="btn-play-again" onClick={ () => push('/') }>
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
