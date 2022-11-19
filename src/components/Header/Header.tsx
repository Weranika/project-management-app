import * as React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import './Header.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo__container" onClick={scrollToTop}>
          <NavLink to="/">
            <img className="logo-img" alt="logo" src={logo} />
          </NavLink>
          <NavLink to="/">
            <h1 className="logo__title">Project manager</h1>
          </NavLink>
        </div>
        <nav>
          <ul className="navbar">
            <li>
              <button className="button__change-lang">EN</button>
            </li>
            <li>
              <NavLink to="/signIn" end>
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink to="/signUp">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/board">Board</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
