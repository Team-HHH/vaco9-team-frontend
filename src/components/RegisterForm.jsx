import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import Joi from 'joi';
import { registerErrorMessage } from '../constants/validationErrorMessage';

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
  height: 60vh;
`;

const Label = styled.div`
  margin: 5px;
`;

const Input = styled.input`
  display: block;
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
            render={() => <p>{registerErrorMessage.INVALID_EMAIL}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_NAME}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_PASSWORD}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_PASSWORDCONFIRM}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_COMPANYNAME}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_COMPANYEMAIL}</p>}
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
            render={() => <p>{registerErrorMessage.INVALID_COMPANYREGISTRATIONNUMBER}</p>}
          />
          <Input
            type="submit"
            value="Register"
          />
        </form>
      </FormWrapper>
    </RegisterWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
