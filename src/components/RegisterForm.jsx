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

export default function RegisterForm(props) {
  const { onRegisterInputChange, onRegisterFormSubmit, } = props;
  const {
    register,
    formState: { errors, },
    getValues,
    handleSubmit,
  } = useForm();

  return (
    <RegisterWrapper>
      <FormWrapper>
        <h1>Create your account</h1>
        <form
          name='form'
          onSubmit={
            handleSubmit((data, e) => {
              onRegisterFormSubmit(e);
            })
          }
        >
          <Label>Email</Label>
          <Input
            type='email'
            name='email'
            onChange={onRegisterInputChange}
            required
          />
          <Label>Name</Label>
          <Input
            type='text'
            name='name'
            onChange={onRegisterInputChange}
            required
          />
          <Label>Password</Label>
          <Input
            type='password'
            {...register('password')}
            minLength='8'
            onChange={onRegisterInputChange}
            required
          />
          <Label>Confirm Password</Label>
          <Input
            type='password'
            {...register('passwordConfirmation', {
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password, } = getValues();
                  return password === value || 'password should match';
                },
              },
            })}
            minLength='8'
            required
          />
          {errors.passwordConfirmation && (
            <p>{errors.passwordConfirmation.message}</p>
          )}
          <Label>Company Name</Label>
          <Input
            type='text'
            name='companyName'
            onChange={onRegisterInputChange}
          />
          <Label>Company Email</Label>
          <Input
            type='text'
            name='companyEmail'
            onChange={onRegisterInputChange}
          />
          <Label>Company Registration Number</Label>
          <Input
            type='text'
            name='companyRegistrationNumber'
            onChange={onRegisterInputChange}
          />
          <Input
            type='submit'
            value='Register'
          />
        </form>
      </FormWrapper>
    </RegisterWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterInputChange: PropTypes.func.isRequired,
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
