import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Main from './components/pages/Main/Main';
import Board from './components/pages/Board/Board';
import Page404 from './components/pages/Page404/Page404';
import MainLayout from './components/MainLayout/MainLayout';
import { LOCALES } from './lang/locales';
import { messages } from './lang/messages';
import './App.css';
import './global/global.scss';

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
    <IntlProvider
        messages={messages[locale]}
        locale={locale}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="board" element={<Board />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </HashRouter>
    </IntlProvider>
  );
}

export default App;
