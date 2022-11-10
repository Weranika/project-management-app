import React from 'react';
import { Link } from 'react-router-dom';
import './Main.scss';

function Main() {

  return (
    <main className="main">
      <section className="start-page">
          {/* {!isAuthorized ? ( */}
            <div className="start-page__registration-form">
              <Link
                to="/#logIn"
                className="login__button registration-button"
              >
                LOG IN
              </Link>
              <Link
                to="/#logIn"
                className="registration__button registration-button"
              >
                SIGN UP
              </Link>
            </div>
          {/* ) : (
            ''
          )} */}
      </section>
    </main>
  );
}

export default Main;
