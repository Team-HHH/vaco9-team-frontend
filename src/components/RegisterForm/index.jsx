import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import { RegisterForm as S } from './styles';
import { schema } from '../../validations/registerFormSchema';
import { commonErrorMessage, registerErrorMessage } from '../../constants/validationErrorMessage';

export default function RegisterForm({ onRegisterFormSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  return (
    <S.RegisterWrapper>
      <S.FormWrapper>
        <h1>회원가입</h1>
        <form
          name="form"
          onSubmit={handleSubmit(onRegisterFormSubmit)}
        >
          <S.Label>이메일 주소</S.Label>
          <S.Input
            type="email"
            name="email"
            {...register('email')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={() => <S.Message>{commonErrorMessage.INVALID_EMAIL}</S.Message>}
          />
          <S.Label>이름</S.Label>
          <S.Input
            type="text"
            name="name"
            {...register('name')}
            required
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={() => <S.Message>{registerErrorMessage.INVALID_NAME}</S.Message>}
          />
          <S.Label>비밀번호</S.Label>
          <S.Input
            type="password"
            name="password"
            {...register('password')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={() => <S.Message>{commonErrorMessage.INVALID_PASSWORD}</S.Message>}
          />
          <S.Label>비밀번호 확인</S.Label>
          <S.Input
            type="password"
            name="passwordConfirm"
            {...register('passwordConfirm')}
            minLength="8"
            required
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={() => <S.Message>{registerErrorMessage.INVALID_PASSWORDCONFIRM}</S.Message>}
          />
          <S.Label>회사이름</S.Label>
          <S.Input
            type="text"
            name="companyName"
            {...register('companyName')}
          />
          <ErrorMessage
            errors={errors}
            name="companyName"
            render={() => <S.Message>{registerErrorMessage.INVALID_COMPANYNAME}</S.Message>}
          />
          <S.Label>회사 이메일 주소</S.Label>
          <S.Input
            type="text"
            name="companyEmail"
            {...register('companyEmail')}
          />
          <ErrorMessage
            errors={errors}
            name="companyEmail"
            render={() => <S.Message>{registerErrorMessage.INVALID_COMPANYEMAIL}</S.Message>}
          />
          <S.Label>회사 사업자 등록번호</S.Label>
          <S.Input
            type="text"
            name="companyRegistrationNumber"
            {...register('companyRegistrationNumber')}
          />
          <ErrorMessage
            errors={errors}
            name="companyRegistrationNumber"
            render={() => <S.Message>{registerErrorMessage.INVALID_COMPANYREGISTRATIONNUMBER}</S.Message>}
          />
          <S.Button
            type="submit"
            value="회원가입"
          />
        </form>
        <div>
          <span>계정이 있으신가요??</span>
          <a href="/login">로그인</a>
        </div>
      </S.FormWrapper>
    </S.RegisterWrapper>
  );
}

RegisterForm.propTypes = {
  onRegisterFormSubmit: PropTypes.func.isRequired,
};
