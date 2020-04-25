import React, { Component } from 'react';
import connect from '../store/connect';

class Login extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <p>{JSON.stringify(data)}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data2,
  };
};

export default connect(mapStateToProps)(Login);
