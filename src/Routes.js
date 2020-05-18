import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RentalHome from './pages/RentalHome';
import Login from './pages/Login';
import Register from './pages/Register';
import RentalDetail from './pages/RentalDetail';
import SecretPage from './pages/SecretPage';
import AuthRoute from './components/auth/AuthRoute';
import GuestRoute from './components/auth/GuestRoute';
import RentalNew from './pages/RentalNew';
import RentalHomeSearch from './pages/RentalHomeSearch';
import ManageBookings from './pages/ManageBookings';
import ReceivedBookings from './pages/ReceivedBookings';
import ManageRentals from './pages/ManageRentals';

export default function Routes() {
  return (
    <div className="container bwm-container">
      <Switch>
        <Route exact path="/">
          <RentalHome />
        </Route>
        <AuthRoute path="/bookings/manage">
          <ManageBookings />
        </AuthRoute>
        <AuthRoute path="/bookings/received">
          <ReceivedBookings />
        </AuthRoute>
        <AuthRoute path="/rentals/manage">
          <ManageRentals />
        </AuthRoute>

        <Route path="/rentals/:location/homes">
          <RentalHomeSearch />
        </Route>
        <AuthRoute path="/rentals/new">
          <RentalNew />
        </AuthRoute>
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
