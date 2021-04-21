import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import Card from './Card';

import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { createCampaignErrorMessage } from '../constants/validationErrorMessage';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string()
    .required(),
  campaignType: Joi.string()
    .valid('banner', 'text', 'video')
    .required(),
  expiresType: Joi.string()
    .valid('continue', 'expired')
    .required(),
  content: Joi.string()
    .required(),
  expiresAt: Joi.date()
    .greater('now')
    .required(),
  dailyBudget: Joi.number()
    .required(),
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
`;

const Title = styled.h2`
  margin: 20px;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '500px'};
  margin: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function CampaignForm({ onFormSubmit }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const watchDailyBudget = watch('dailyBudget', 100);
  const watchType = watch('expiresType', 'expired');
  const watchExpiresAt = watch('expiresAt');
  const campaignDuration = differenceInCalendarDays(parseISO(watchExpiresAt), new Date());

  return (
    <Container>
      <TitleWrapper>
        <Title>캠페인 시작하기</Title>
      </TitleWrapper>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <ContentWrapper>
            <Card title="캠페인 제목">
              <input
                type="text"
                name="title"
                {...register('title')}
              />
              <ErrorMessage
                errors={errors}
                name="title"
                render={() => <p>{createCampaignErrorMessage.INVALID_TITLE}</p>}
              />
            </Card>
            <Card title="캠페인 타입">
              <SelectWrapper>
                <div>
                  <select
                    name="campaignType"
                    {...register('campaignType')}
                  >
                    <option value={'banner'}>배너</option>
                    <option value={'text'}>텍스트</option>
                    <option value={'video'}>비디오</option>
                  </select>
                </div>
              </SelectWrapper>
              <ErrorMessage
                errors={errors}
                name="campaignType"
                render={() => <p>{createCampaignErrorMessage.INVALID_CAMPAIGNTYPE}</p>}
              />
            </Card>
            <Card title="배너이미지 추가하기">
              <label htmlFor="content">URL </label>
              <input
                type="text"
                id="content"
                name="content"
                {...register('content')}
              />
              <ErrorMessage
                errors={errors}
                name="content"
                render={() => <p>{createCampaignErrorMessage.INVALID_CONTENT}</p>}
              />
            </Card>
            <Card title='기간'>
              <SelectWrapper>
                <div>
                  <select
                    name="expiresType"
                    defaultValue="expired"
                    {...register('expiresType')}
                  >
                    <option value={'expired'}>종료일 선택</option>
                    <option value={'continue'}>종료일 없이 계속 게재</option>
                  </select>
                </div>
                <div>
                  {watchType === 'expired' && (
                    <input
                      type="date"
                      {...register('expiresAt')}
                    />
                  )}
                </div>
              </SelectWrapper>
              <ErrorMessage
                errors={errors}
                name="expiresType"
                render={() => <p>{createCampaignErrorMessage.INVALID_EXPIRESTYPE}</p>}
              />
            </Card>
            <Card title='일일 예산'>
              <SliderWrapper>
                <h2>{watchDailyBudget} 원</h2>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="1000"
                  name="dailyBudget"
                  {...register('dailyBudget')}
                />
              </SliderWrapper>
              <ErrorMessage
                errors={errors}
                name="dailyBudget"
                render={() => <p>{createCampaignErrorMessage.INVALID_DAILYBUDGET}</p>}
              />
            </Card>
            <Card title="결제 수단">
              <p>API</p>
            </Card>
          </ContentWrapper>
          <ContentWrapper width="360px">
            <span>광고 미리보기</span>
            <span>일일 추산 결과</span>
            <span>결제 요약</span>
            <span>결제금액 : {watchDailyBudget}원 * {campaignDuration}일 = {watchDailyBudget * campaignDuration}</span>
            <button>시작하기</button>
          </ContentWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}
