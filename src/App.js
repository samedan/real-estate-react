import React from 'react';
import Header from './components/shared/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { StateContext } from './state-context';
import { initStore } from './store';

const store = initStore();
export default function App() {
  return (
    <StateContext.Provider value={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </StateContext.Provider>
  );
}
