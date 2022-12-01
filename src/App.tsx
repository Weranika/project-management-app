import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Main from './components/pages/Main/Main';
import BoardList from './components/pages/BoardList/BoardList';
import Page404 from './components/pages/Page404/Page404';
import MainLayout from './components/MainLayout/MainLayout';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';
import './App.css';
import './global/global.scss';
import { AuthPage } from './components/pages/SignIn/signIn';

import { SignUpPage } from './components/pages/SignUp/SignUp';
import Board from './components/pages/Board/Board';

function App() {
  const locale = LOCALES.RUSSIAN;
  // const [currentLocale, setCurrentLocale] = useState(getInitialLocale());
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCurrentLocale(event.currentTarget.value);
  //   localStorage.setItem('locale', event.currentTarget.value);
  // }
  // function getInitialLocale() {
  //   const savedLocale = localStorage.getItem('locale');
  //   return savedLocale || LOCALES.ENGLISH;
  // }

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="board" element={<BoardList />} />
            <Route path="board/:id" element={<Board />} />
            <Route path="*" element={<Page404 />} />
            <Route path="signIn" element={<AuthPage />} />
            <Route path="signUp" element={<SignUpPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </IntlProvider>
  );
}

export default App;
