import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Card from './Card';

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
  } = useForm();
  const watchDailyBudget = watch('dailyBudget', 5000);
  const watchType = watch('type');

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
            </Card>
            <Card title="배너이미지 추가하기">
              <label htmlFor="banner">URL </label>
              <input
                type="text"
                id="banner"
                name="bannerUrl"
                {...register('banner')}
              />
            </Card>
            <Card title="기간">
              <SelectWrapper>
                <div>
                  <select
                    name="type"
                    {...register('type')}
                  >
                    <option value={'keepGoing'}>종료일 없이 계속 게재</option>
                    <option value={'expired'}>종료일 선택</option>
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
            </Card>
            <Card title="일일 예산">
              <SliderWrapper>
                <h2>{watchDailyBudget} 원</h2>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  name="dailyBudget"
                  {...register('dailyBudget')}
                />
              </SliderWrapper>
            </Card>
            <Card title="결제 수단">
              <p>API</p>
            </Card>
          </ContentWrapper>
          <ContentWrapper width="360px">
            <span>광고 미리보기</span>
            <span>일일 추산 결과</span>
            <span>결제 요약</span>
            <button>시작하기</button>
          </ContentWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}
