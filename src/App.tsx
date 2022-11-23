import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Main from './components/pages/Main/Main';
import Board from './components/pages/Board/Board';
import Page404 from './components/pages/Page404/Page404';
import MainLayout from './components/MainLayout/MainLayout';
import './App.css';
import './global/global.scss';
import { AuthPage } from './components/pages/SignIn/signIn';

import { SignUpPage } from './components/pages/SignUp/SignUp';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="board" element={<Board />} />
          <Route path="*" element={<Page404 />} />
          <Route path="signIn" element={<AuthPage />} />
          <Route path="signUp" element={<SignUpPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
