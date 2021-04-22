import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { color } from '../css/color';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { commonErrorMessage, registerErrorMessage } from '../constants/validationErrorMessage';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  name: Joi.string()
    .required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'))
    .required(),
  passwordConfirm: Joi.string()
    .min(8)
    .max(20)
    .valid(Joi.ref('password'))
    .required(),
  companyName: Joi.string()
    .required(),
  companyEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  companyRegistrationNumber: Joi.string()
    .pattern(new RegExp('([0-9]{3})-([0-9]{2})-([0-9]{5})'))
    .required(),
});

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  height: 80vh;
`;

const Label = styled.div`
  margin: 3px;
`;

const Input = styled.input`
  display: block;
  border: none;
	padding: 8px 15px;
	margin: 3px 0;
	width: 80%;
  border-radius: 8px;
  background-color: #eee;
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

export default function RegisterForm({ onRegisterFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <RegisterWrapper>
      <FormWrapper>
        <h1>Create your account</h1>
        <form
          name="form"
          onSubmit={handleSubmit(onRegisterFormSubmit)}
        >
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            {...register('email')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={() => <Message>{commonErrorMessage.INVALID_EMAIL}</Message>}
          />
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            {...register('name')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={() => <Message>{registerErrorMessage.INVALID_NAME}</Message>}
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            {...register('password')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <Message>{commonErrorMessage.INVALID_ErrorMessageASSWORD}</Message>}
          />
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="passwordConfirm"
            {...register('passwordConfirm')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={() => <Message>{registerErrorMessage.INVALID_PASSWORDCONFIRM}</Message>}
          />
          <Label>Company Name</Label>
          <Input
            type="text"
            name="companyName"
            {...register('companyName')}
          />
          <ErrorMessage
            errors={errors}
            name="companyName"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYNAME}</Message>}
          />
          <Label>Company Email</Label>
          <Input
            type="text"
            name="companyEmail"
            {...register('companyEmail')}
          />
          <ErrorMessage
            errors={errors}
            name="companyEmail"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYEMAIL}</Message>}
          />
          <Label>Company Registration Number</Label>
          <Input
            type="text"
            name="companyRegistrationNumber"
            {...register('companyRegistrationNumber')}
          />
          <ErrorMessage
            errors={errors}
            name="companyRegistrationNumber"
            render={() => <Message>{registerErrorMessage.INVALID_COMPANYREGISTRATIONNUMBER}</Message>}
          />
          <Button
            type="submit"
            value="Register"
          />
        </form>
        <div>
          <span>Have account?</span>
          <a href="/login">Login</a>
        </div>
      </FormWrapper>
    </RegisterWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
