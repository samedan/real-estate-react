import React from 'react';
import Header from './components/shared/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Provider from './store/Provider';
import { initStore } from './store';

const store = initStore();
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
}
