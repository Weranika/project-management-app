import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hook';

import Main from './components/pages/Main/Main';
import Page404 from './components/pages/Page404/Page404';
import MainLayout from './components/MainLayout/MainLayout';
import { messages } from './lang/messages';
import { AuthPage } from './components/pages/SignIn/signIn';
import { SignUpPage } from './components/pages/SignUp/SignUp';
import Spinner from './components/Spinner/Spinner';
import { AuthState } from './types';

import './App.css';
import './global/global.scss';
import { setIsAuth } from './reducers/authSlice';

const LazyBoardList = React.lazy(
  () => import('./components/pages/BoardList/BoardList'),
);
const LazyBoard = React.lazy(() => import('./components/pages/Board/Board'));

function App() {
  const lang = useAppSelector(state => state.lang);
  const dispatch = useAppDispatch();
  const { isAuth } = useSelector((state: { auth: AuthState }) => state.auth);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(setIsAuth(true));
    } else {
      dispatch(setIsAuth(false));
    }
  }, []);

  return (
    <IntlProvider messages={messages[lang.lang]} locale={lang.lang}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route
              path="board"
              element={
                isAuth ? (
                  <React.Suspense fallback={<Spinner />}>
                    <LazyBoardList />
                  </React.Suspense>
                ) : (
                  <Main />
                )
              }
            />
            <Route
              path="board/:id"
              element={
                isAuth ? (
                  <React.Suspense fallback={<Spinner />}>
                    <LazyBoard />
                  </React.Suspense>
                ) : (
                  <Main />
                )
              }
            />

            <Route path="*" element={<Page404 />} />
            <Route path="signIn" element={isAuth ? <Main /> : <AuthPage />} />
            <Route path="signUp" element={isAuth ? <Main /> : <SignUpPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </IntlProvider>
  );
}

export default App;
