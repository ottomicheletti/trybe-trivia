import React from 'react';
import { PropTypes } from 'prop-types';
import Header from './components/Header';

const Feedback = (props) => {
  const { history: { push } } = props;
  return (
    <div data-testid="feedback-text">
      <Header />
      <button type="button" data-testid="btn-play-again" onClick={ () => push('/') }>
        Play Again
      </button>
    </div>
  );
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Feedback;
