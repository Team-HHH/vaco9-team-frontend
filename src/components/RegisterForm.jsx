import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  margin:auto 0;
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
    <FormWrapper>
      <Form
        name='form'
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
        <Label>Email</Label>
        <Input
          type='email'
          {...register('email', { required: true, maxLength: 10, })}
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
          name='password'
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
          name='passwordConfirmation'
          minLength='8'
          onChange={onRegisterInputChange}
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
      </Form>
    </FormWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterInputChange: PropTypes.func.isRequired,
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
