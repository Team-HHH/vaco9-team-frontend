import React, { useState } from 'react';
import styled from 'styled-components';
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

export default function CampaignForm() {
  const [form, setForm] = useState({
    title: '',
    bannerUrl: '',
    type: '',
    expiresAt: '',
    dailyBudget: 5000,
  });

  const handleTitleChange = (e) => setForm((prevForm) => {
    return { ...prevForm, title: e.target.value };
  });
  const handlebannerUrlChange = (e) => setForm((prevForm) => {
    return { ...prevForm, bannerUrl: e.target.value };
  });
  const handleTypeChange = (e) => setForm((prevForm) => {
    return { ...prevForm, type: e.target.value };
  });
  const handleDateChange = (e) => setForm((prevForm) => {
    return { ...prevForm, expiresAt: e.target.value };
  });
  const handleDailyBudgetChange = (e) => setForm((prevForm) => {
    return { ...prevForm, dailyBudget: e.target.value };
  });

  return (
    <Container>
      <TitleWrapper>
        <Title>캠페인 시작하기</Title>
      </TitleWrapper>
      <FormWrapper>
        <Form>
          <ContentWrapper>
            <Card title="캠페인 제목">
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
              />
            </Card>
            <Card title="배너이미지 추가하기">
              <label htmlFor="banner">URL </label>
              <input
                type="text"
                id="banner"
                value={form.bannerUrl}
                onChange={handlebannerUrlChange}
              />
            </Card>
            <Card title="기간">
              <SelectWrapper>
                <div>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleTypeChange}
                    required
                  >
                    <option value={'keepGoing'}>종료일 없이 계속 게재</option>
                    <option value={'expired'}>종료일 선택</option>
                  </select>
                </div>
                <div>
                  {form.type === 'expired' &&
                    <input
                      type="date"
                      name=""
                      value={form.expiresAt}
                      onChange={handleDateChange}
                    />
                  }
                </div>
              </SelectWrapper>
            </Card>
            <Card title="일일 예산">
              <SliderWrapper>
                <h2>{form.dailyBudget} 원</h2>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={form.dailyBudget}
                  onChange={handleDailyBudgetChange}
                />
              </SliderWrapper>
            </Card>
            <Card title="결제 수단"></Card>
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
