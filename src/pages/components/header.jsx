import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { name, score, gravatarEmail } = useSelector((state) => state.player);
  return (
    <header>
      <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt={ name } />
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">{score}</p>
    </header>
  );
};

export default Header;
