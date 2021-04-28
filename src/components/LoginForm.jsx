import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import { commonErrorMessage } from '../constants/validationErrorMessage';
import { schema } from '../validations/loginFormSchema';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Nanum Barun Gothic';
`;

const FormWrapper = styled.div`
  height: 60vh;
  width: 300px;
`;

const Label = styled.label`
  color: ${props => props.theme.BOLD};
  padding: 3px;
`;

const Input = styled.input`
  display: block;
	border: none;
	padding: 8px 15px;
	margin: 10px 0 20px 0;
	width: 100%;
  border-radius: 5px;
`;

const Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 40%;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.MAIN};
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
        <h1>로그인</h1>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <Label>이메일 주소</Label>
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
          <Label>패스워드</Label>
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
            value="로그인"
          />
        </form>
        <div>
          <span>아직 계정이 없으신가요?</span>
          <a href="/register">회원가입</a>
        </div>
      </FormWrapper>
    </LoginWrapper>
  );
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
};
