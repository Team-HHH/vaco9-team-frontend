import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import Card from './Card';
import Modal from './Modal';
import ADPreviewModal from './ADPreviewModal';

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

const ADPreviewButton = styled.button`
  background-color: yellow;
  cursor: pointer;
`;

export default function CampaignForm({ imageUrl, onImageUpload, onFormSubmit }) {
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
  } = useForm();
  const watchDailyBudget = watch('dailyBudget', 100);
  const watchType = watch('expiresType', 'expired');
  const watchExpiresAt = watch('expiresAt');
  const campaignDuration = differenceInCalendarDays(parseISO(watchExpiresAt), new Date());

  return (
    <Container>
      <TitleWrapper>
        <Title>캠페인 시작하기</Title>
      </TitleWrapper>
      <section>
        <form onSubmit={onImageUpload} encType="multipart/form-data">
          <input type="file" name="image" accept='image/jpg,impge/png,image/jpeg,image/gif' />
          <input type="submit" />
        </form>
        {imageUrl && <img src={imageUrl} height="120" width="280" />}
      </section>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <ContentWrapper>
            <Card title="배너 이미지">
              <input
                type="text"
                name="content"
                value={imageUrl}
                {...register('content')}
              />
            </Card>
            <Card title="캠페인 제목">
              <input
                type="text"
                name="title"
                accept=".jpg,.png,.jpeg"
                {...register('title')}
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
            </Card>
            <Card title="배너이미지 추가하기">
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
            </Card>
            <Card title="결제 수단">
              <p>API</p>
            </Card>
          </ContentWrapper>
          <ContentWrapper width="360px">
            <Modal>
              {
                isPreviewModal &&
                <ADPreviewModal
                  imageUrl={imageUrl}
                  setIsPreviewModal={setIsPreviewModal}
                />
              }
            </Modal>
            <ADPreviewButton
              type="button"
              onClick={() => setIsPreviewModal(true)}
            >광고 미리보기</ADPreviewButton>
            <span>일일 추산 결과</span>
            <span>결제 요약</span>
            <span>결제금액 : {watchDailyBudget}원 * {campaignDuration}일 = {watchDailyBudget * campaignDuration}</span>
            <button type="submit">시작하기</button>
          </ContentWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
}
