import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({ handleLoginSubmit, }) {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });

  const {
    email,
    password,
  } = loginInput;

  function handleLoginInputChange(event) {
    const {
      name,
      value,
    } = event.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

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
  handleLoginSubmit: PropTypes.func.isRequired,
};
