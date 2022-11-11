import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
// import Main from 'components/Main/Main';
// import Board from 'components/Board/Board';
// import Page404 from 'components/Page404/Page404';
// import TemplatePage from 'components/TemplatePage/Template';
import './App.css';
import './global/global.scss';

function App() {
  return (
    <HashRouter>
      {/* <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<Main inputSearch="1" />} />
          <Route path="about-us" element={<Board />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes> */}
    </HashRouter>
  );
}

export default App;
