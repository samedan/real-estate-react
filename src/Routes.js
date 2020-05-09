import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RentalHome from './pages/RentalHome';
import Login from './pages/Login';
import Register from './pages/Register';
import RentalDetail from './pages/RentalDetail';
import SecretPage from './pages/SecretPage';
import AuthRoute from './components/auth/AuthRoute';
import GuestRoute from './components/auth/GuestRoute';

export default function Routes() {
  return (
    <div className="container bwm-container">
      <Switch>
        <Route exact path="/">
          <RentalHome />
        </Route>

        <Route path="/rentals/:id">
          <RentalDetail />
        </Route>

        {/* <AuthRoute path="/secret" component={SecretPage} /> */}
        <AuthRoute path="/secret">
          <SecretPage />
        </AuthRoute>

        <GuestRoute path="/login">
          <Login />
        </GuestRoute>
        <GuestRoute path="/register">
          <Register />
        </GuestRoute>
      </Switch>
    </div>
  );
}
