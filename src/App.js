import React from 'react';

import Header from './components/shared/Header';
import RentalHome from './pages/RentalHome';
import Login from './pages/Login';
import Register from './pages/Register';
import { Router, Route } from './components/Bwm-Router';

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Route path="/">
          <RentalHome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Router>
    </div>
  );
}
