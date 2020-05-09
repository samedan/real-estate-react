import React from 'react';
import { loginUser } from '../actions';

const { createContext } = React;

const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const signIn = (loginData) => {
    return loginUser(loginData).then((token) => {
      console.log(token);
      return token;
    });
  };

  // object
  const authApi = {
    signIn,
  };

  return (
    <AuthContext.Provider value={authApi}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const withAuth = (Component) => {
  return function (props) {
    return (
      <AuthContext.Consumer>
        {(authApi) => <Component {...props} auth={authApi} />}
      </AuthContext.Consumer>
    );
  };
};
