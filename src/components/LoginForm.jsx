import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from '../css/color';
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

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  height: 60vh;
`;

const Label = styled.label`
  color: ${color.BOLD_COLOR};
  margin: 3px;
`;

const Input = styled.input`
  display: block;
	border: none;
	padding: 8px 15px;
	margin: 0 0 20px 0;
	width: 80%;
  border-radius: 8px;
`;

const Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 40%;
  background-color: ${color.SUB_COLOR};
  &:hover {
    background-color: ${color.MAIN_COLOR};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;

export default function LoginForm({ handleLoginSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <LoginWrapper>
      <FormWrapper>
        <h1>Log in to your account</h1>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Label>Email Address</Label>
          <Input
            type="email"
            name="email"
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={() => <Message>{commonErrorMessage.INVALID_EMAIL}</Message>}
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            {...register('password')}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <Message>{commonErrorMessage.INVALID_PASSWORD}</Message>}
          />
          <Button
            type="submit"
            value="Login"
          />
        </form>
        <div>
          <span>Dont have account?</span>
          <a href="/register">Sign up</a>
        </div>
      </FormWrapper>
    </LoginWrapper>
  );
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
};
