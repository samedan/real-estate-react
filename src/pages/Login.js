import React, { Component } from 'react';
import LoginForm from '../components/forms/LoginForm';

class Login extends Component {
  loginUser = (loginData) => {
    console.log(loginData);
  };
  render() {
    return (
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            <LoginForm onSubmit={this.loginUser} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Hundreds of awesome places in reach of few clicks.
              </h2>
              <img src="/images/login-image.jpg" alt="Login an user" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
