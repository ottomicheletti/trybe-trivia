import React from 'react';
import { PropTypes } from 'prop-types';
import './Ranking.css';

const Ranking = (props) => {
  const {
    history: { push },
  } = props;
  const ranking = JSON.parse(localStorage.getItem('ranking')).sort(
    (a, b) => b.score - a.score
  );
  console.log(ranking);
  return (
    <div>
      <h1 data-testid='ranking-title'>Ranking</h1>
      <button
        type='button'
        className='btn-go-home'
        data-testid='btn-go-home'
        onClick={() => push('/')}
      >
        Inicio
      </button>
      <div>
        {ranking.map(({ gravatarEmail, name, score }, index) => (
          <div className='pessoa-card' key={score}>
            <img src={`https://www.gravatar.com/avatar/${gravatarEmail}`} alt={name} />
            <div className='info-pessoa-card'>
              <h2 data-testid={`player-name-${index}`}>{name}</h2>
              <h2 data-testid={`player-score-${index}`}>{score}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
