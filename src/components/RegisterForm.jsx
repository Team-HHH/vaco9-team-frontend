import React from 'react';
import PropTypes from 'prop-types';

export default function RegisterForm(props) {
  const { onRegisterInputChange, onRegisterFormSubmit, } = props;

  return (
    <form name="form">
      <label>Email</label>
      <input
        type="email"
        name="email"
        onChange={onRegisterInputChange}
        required
      />
      <label>Name</label>
      <input
        type="text"
        name="name"
        onChange={onRegisterInputChange}
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        minLength="8"
        onChange={onRegisterInputChange}
        required
      />
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        minLength="8"
        onChange={onRegisterInputChange}
        required
      />
      <label>Company Name</label>
      <input
        type="text"
        name="companyName"
        onChange={onRegisterInputChange}
      />
      <label>Company Email</label>
      <input
        type="text"
        name="companyEmail"
        onChange={onRegisterInputChange}
      />
      <label>Company Registration Number</label>
      <input
        type="text"
        name="companyRegistrationNumber"
        onChange={onRegisterInputChange}
      />
      <input
        type="submit"
        value="Register"
        onSubmit={onRegisterFormSubmit}
      />
    </form>
  );
}

RegisterForm.propTypes = {
  onRegisterInputChange: PropTypes.func.isRequired,
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
