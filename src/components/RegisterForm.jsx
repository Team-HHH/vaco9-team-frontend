import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
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

  return (
    <FormWrapper>
      <Form name="form">
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          onChange={onRegisterInputChange}
          required
        />
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          onChange={onRegisterInputChange}
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          minLength="8"
          onChange={onRegisterInputChange}
          required
        />
        <Label>Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          minLength="8"
          onChange={onRegisterInputChange}
          required
        />
        <Label>Company Name</Label>
        <Input
          type="text"
          name="companyName"
          onChange={onRegisterInputChange}
        />
        <Label>Company Email</Label>
        <Input
          type="text"
          name="companyEmail"
          onChange={onRegisterInputChange}
        />
        <Label>Company Registration Number</Label>
        <Input
          type="text"
          name="companyRegistrationNumber"
          onChange={onRegisterInputChange}
        />
        <Input
          type="submit"
          value="Register"
          onSubmit={onRegisterFormSubmit}
        />
      </Form>
    </FormWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterInputChange: PropTypes.func.isRequired,
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
