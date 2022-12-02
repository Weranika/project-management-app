import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Main from './components/pages/Main/Main';
import Page404 from './components/pages/Page404/Page404';
import MainLayout from './components/MainLayout/MainLayout';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';
import { AuthPage } from './components/pages/SignIn/signIn';
import { SignUpPage } from './components/pages/SignUp/SignUp';

import './App.css';
import './global/global.scss';
import Spinner from './components/Spinner/Spinner';

const LazyBoardList = React.lazy(
  () => import('./components/pages/BoardList/BoardList'),
);
const LazyBoard = React.lazy(() => import('./components/pages/Board/Board'));

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
            <Route
              path="board"
              element={
                <React.Suspense fallback={<Spinner />}>
                  <LazyBoardList />
                </React.Suspense>
              }
            />
            <Route
              path="board/:id"
              element={
                <React.Suspense fallback={<Spinner />}>
                  <LazyBoard />
                </React.Suspense>
              }
            />
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
