import * as React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import { FormattedMessage } from 'react-intl';
import { LOCALES } from '../../lang/locales';
import './Header.scss';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const languages = [
  { name: 'English', code: LOCALES.ENGLISH },
  { name: 'Русский', code: LOCALES.RUSSIAN },
]
// interface IProps {
//   currentLocale: string;
//   handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
// }

function Header() {
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
        <nav >
          <ul className="navbar">
            <li className="change-lang">
            <select>
              {/* <select onChange={props.handleChange} value={props.currentLocale}> */}
                {languages.map(({ name, code }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
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
              <NavLink to="/board"><FormattedMessage id='board' /></NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
