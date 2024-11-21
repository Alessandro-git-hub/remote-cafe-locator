import React, { useState } from 'react';
import './Header.css'; // Add styles for your header

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <>
    <header className="header">
      <div className="header__logo">
        <img src="/icons/logo.png" alt="Logo" className="header__logo-img" />
        
      </div>
      <div className="header__title">FindMySpot</div>
      <button className="header__menu-button" onClick={toggleMenu}>
          ☰
        </button>
        </header>

        <nav className={`side-menu ${isMenuOpen ? 'side-menu--open' : ''}`}>
        <ul className="side-menu__list">
          <li className="side-menu__item"><a href="/">Home</a></li>
          <li className="side-menu__item"><a href="/favorites">Favorites</a></li>
          <li className="side-menu__item"><a href="/submit">Submit Café</a></li>
        </ul>
        <button className="side-menu__close-button" onClick={toggleMenu}>
          ✕
        </button>
      </nav>
    </>
  );
};

export default Header;
