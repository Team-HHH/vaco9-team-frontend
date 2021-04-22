import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { commonErrorMessage } from '../constants/validationErrorMessage';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
    .required(),
});

export default function LoginForm({ handleLoginSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <section>
      <h1>Log in to your account</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <p>Email Address</p>
        <input
          type="email"
          name="email"
          {...register('email')}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={() => <p>{commonErrorMessage.INVALID_EMAIL}</p>}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          {...register('password')}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={() => <p>{commonErrorMessage.INVALID_PASSWORD}</p>}
        />
        <button>Login</button>
      </form>
      <div>
        <span>Dont have account?</span>
        <a href="/register">Sign up</a>
      </div>
    </section>
  );
}

LoginForm.propTypes = {
  handleLoginInputChange: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  loginInput: PropTypes.object.isRequired,
};
