import React from 'react';
import { PropTypes } from 'prop-types';
import Header from './components/Header';

const Ranking = (props) => {
  const { history: { push } } = props;
  return (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <Header />
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => push('/') }
      >
        Inicio
      </button>
    </div>
  );
};

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
