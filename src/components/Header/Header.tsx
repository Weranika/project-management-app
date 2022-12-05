import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../hook';
import { NavLink } from 'react-router-dom';
import { setLang } from '../../reducers/langSlice';

import Button from '@mui/material/Button';

import { setIsAuth } from '../../reducers/authSlice';
import { FormattedMessage } from 'react-intl';
import { setShowModalCreateBoard } from '../../reducers/modalPopupSlice';
import { LOCALES } from '../../lang/locales';
import { AuthState } from '../../types';
import logo from '../../assets/icons/logo.png';
import './Header.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const languages = [
  { name: 'English', code: LOCALES.ENGLISH },
  { name: 'Russian', code: LOCALES.RUSSIAN },
];

function Header() {
  const lang = useAppSelector(state => state.lang);

  const dispatch = useAppDispatch();

  const { isAuth, isLoading, hasError, message } = useSelector(
    (state: { auth: AuthState }) => state.auth,
  );

  const signOut = () => {
    localStorage.clear();
    dispatch(setIsAuth(false));
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo__container" onClick={scrollToTop}>
          <NavLink to="/">
            <img className="logo-img" alt="logo" src={logo} />
          </NavLink>
          <NavLink to="/">
            <h1 className="logo__title">Pro Manager</h1>
          </NavLink>
        </div>
        <nav className="navbar__container">
          <ul className="navbar">
            <li className="change-lang">
              <select
                value={localStorage.getItem('lang') as string}
                onChange={event => {
                  const value = event.currentTarget.value;
                  dispatch(setLang(value));
                  localStorage.setItem('lang', value);
                }}
              >
                {languages.map(({ name, code }) =>
                  code === localStorage.getItem('lang') ? (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ) : (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ),
                )}
              </select>
            </li>
            {isAuth && (
              <li>
                {' '}
                <Button
                  variant="contained"
                  onClick={() => dispatch(setShowModalCreateBoard(true))}
                >
                  <FormattedMessage id="add_board" />
                </Button>
              </li>
            )}
            {!isAuth && (
              <li>
                <NavLink to="/signIn" end className="nav__link">
                  <FormattedMessage id="sign_in" />
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li>
                <NavLink to="/signUp" className="nav__link">
                  <FormattedMessage id="sign_up" />
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <NavLink to="/board" className="nav__link">
                  <FormattedMessage id="Go to Main Page" />
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li onClick={signOut}>
                <NavLink to="/">
                  <FormattedMessage id="Sign out" />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
