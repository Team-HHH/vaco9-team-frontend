import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({
  handleLoginInputChange,
  handleLoginSubmit,
  loginInput,
}) {

  const {
    email,
    password,
  } = loginInput;

  return (
    <section>
      <h1>Log in to your account</h1>
      <form onSubmit={handleLoginSubmit}>
        <p>Email Address</p>
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleLoginInputChange}
        />
        <p>Password</p>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleLoginInputChange}
        />
        <button>Login</button>
      </form>
      <div>
        <span>Dont have account?</span>
        <a href='/register'>Sign up</a>
      </div>
    </section>
  );
}

LoginForm.propTypes = {
  handleLoginInputChange: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  loginInput: PropTypes.object.isRequired,
};
