import React from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import FormError from './FormError';

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Error = ({ children }) => (
  <div className="alert alert-danger">{children}</div>
);

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register({
            required: 'Email is required',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Invalid email format',
            },
          })}
          noValidate
          name="email"
          type="email"
          className="form-control"
          id="email"
        />

        {/* <ErrorMessage as={<Error />} errors={errors} name="email">
          {({ message }) => <p>{message}</p>}
        </ErrorMessage> */}
        <FormError errors={errors} name="email">
          {(message) => <p>{message}</p>}
        </FormError>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register({
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Minimum length of the password is 6 characters.',
            },
          })}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />

        <ErrorMessage as={<Error />} errors={errors} name="password">
          {({ message }) => <p>{message}</p>}
        </ErrorMessage>
      </div>
      <button type="submit" className="btn btn-bwm-main">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
