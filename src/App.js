import React from 'react';
import Header from './components/shared/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { initStore } from './store';
import { AuthProvider } from './providers/AuthProvider';

const store = initStore();
export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </AuthProvider>
    </Provider>
  );
}
