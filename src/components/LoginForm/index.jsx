import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import { LoginForm as S } from './styles';
import { schema } from '../../validations/loginFormSchema';
import { commonErrorMessage } from '../../constants/validationErrorMessage';

export default function LoginForm({ handleLoginSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <S.LoginFormWrapper>
      <S.LoginFormSection onSubmit={handleSubmit(handleLoginSubmit)}>
        <S.LoginTitle>로그인</S.LoginTitle>
        <S.InputWrapper>
          <S.Label>이메일 주소</S.Label>
          <S.Input
            type="email"
            name="email"
            {...register('email')}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={() => <S.Message>{commonErrorMessage.INVALID_EMAIL}</S.Message>}
          />
          <S.Label>패스워드</S.Label>
          <S.Input
            type="password"
            name="password"
            {...register('password')}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <S.Message>{commonErrorMessage.INVALID_PASSWORD}</S.Message>}
          />
        </S.InputWrapper>
        <S.LoginFooter>
          <S.Button
            type="submit"
            value="로그인"
          />
          <S.LoginFooterTextAndLink>
            <S.LoginFooterText>아직 계정이 없으신가요?</S.LoginFooterText>
            <S.LoginFooterLink href="/register">회원가입</S.LoginFooterLink>
          </S.LoginFooterTextAndLink>
        </S.LoginFooter>
      </S.LoginFormSection>
    </S.LoginFormWrapper>
  );
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
};
