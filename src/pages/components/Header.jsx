import React from 'react';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const { name, score, gravatarEmail } = useSelector((state) => state.player);
  return (
    <header>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
        alt={ name }
      />
      <div>
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    </header>
  );
};

export default Header;
