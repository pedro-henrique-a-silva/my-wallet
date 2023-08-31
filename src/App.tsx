import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './style/global';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/carteira" element={ <Wallet /> } />

      </Routes>
    </>
  );
}

export default App;
