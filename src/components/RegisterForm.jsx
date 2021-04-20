import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

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
  } = useForm();

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
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            {...register('name')}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            minLength="8"
            {...register('password')}
            required
          />
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="passwordConfirm"
            {...register('passwordConfirm')}
            minLength="8"
            required
          />
          <Label>Company Name</Label>
          <Input
            type="text"
            name="companyName"
            {...register('companyName')}
          />
          <Label>Company Email</Label>
          <Input
            type="text"
            name="companyEmail"
            {...register('companyEmail')}
          />
          <Label>Company Registration Number</Label>
          <Input
            type="text"
            name="companyRegistrationNumber"
            {...register('companyRegistrationNumber')}
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
