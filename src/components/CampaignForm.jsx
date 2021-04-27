import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { parseISO, differenceInCalendarDays, format, addDays } from 'date-fns';

import Card from './Card';
import Modal from './Modal';
import AdPreview from './AdPreview';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: 80px;
  font-family: 'Nanum Barun Gothic';
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
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
  margin: 0 40px;
`;

const InputWrapper = styled.div`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
`;

const UploaderPadding = styled.div`
  height: 40px;
`;

const Uploader = styled.form`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 330px;
  left: 30px;
  width: 500px;
  height: fit-content;
  z-index: 1;
`;

const UploadLabel = styled.label`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${props => props.theme.LIGHT};
  &:hover {
    background-color: ${props => props.theme.DARK}
  }
`;

const UploadInput = styled.input`
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.theme.LIGHT};
  &:hover {
    background-color: ${props => props.theme.DARK}
  }
`;

const Form = styled.form`
  display: flex;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Select = styled.select`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: #f9f9f9;
  padding: 10px;
`;

const DateInput = styled.input`
  margin: 10px 0;
  border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
	width: 93%;
  border-radius: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
	border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
	width: 100%;
  border-radius: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Estimate = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.span`
  margin: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 40%;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 10px 0;
  background-color: ${props => props.theme.OUTLINE};
`;

const ADPreviewButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background-color: ${props => props.theme.LIGHT};
  &:hover {
    background-color: ${props => props.theme.DARK}
  }
`;

const DailyEstimateResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const DailyEstimateResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DailyEstimateResults = styled.span`
  font-size: 20px;
`;

export default function CampaignForm({ imageUrl, onImageUpload, onFormSubmit }) {
  const [isAdPreview, setIsAdPreview] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
  } = useForm();
  const watchDailyBudget = watch('dailyBudget', 2000);
  const watchType = watch('expiresType', 'expired');
  const watchExpiresAt = watch('expiresAt', format(addDays(new Date(), 5), 'yyyy-MM-dd'));
  const campaignDuration = differenceInCalendarDays(parseISO(watchExpiresAt), new Date());

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>캠페인 시작하기</Title>
        </TitleWrapper>
        <section>
          <Uploader
            onSubmit={onImageUpload}
            encType="multipart/form-data"
          >
            <UploadLabel htmlFor="file">배너 이미지 선택</UploadLabel>
            <input
              type="file"
              id="file"
              name="image"
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg,image/gif'
            />
            <UploadInput type="submit" value="업로드" />
          </Uploader>
        </section>
        <FormWrapper>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <ContentWrapper>
              <InputWrapper>
                <Card title="캠페인 제목">
                  <Input
                    type="text"
                    name="title"
                    accept=".jpg,.png,.jpeg"
                    {...register('title')}
                  />
                </Card>
                <Card title="캠페인 타입">
                  <SelectWrapper>
                    <Select
                      name="campaignType"
                      {...register('campaignType')}
                    >
                      <option value={'banner'}>배너</option>
                      <option value={'text'}>텍스트</option>
                      <option value={'video'}>비디오</option>
                    </Select>
                  </SelectWrapper>
                </Card>
                <Card title="웹 사이트 주소">
                  <Input
                    type="text"
                    name="campaignUrl"
                    {...register('campaignUrl')}
                  />
                </Card>
                <Card title="배너이미지 추가하기">
                  <UploaderPadding />
                </Card>
              </InputWrapper>
              <InputWrapper>
                <Card title="기간">
                  <SelectWrapper>
                    <SelectWrapper>
                      <Select
                        name="expiresType"
                        defaultValue="expired"
                        {...register('expiresType')}
                      >
                        <option value={'expired'}>종료일 선택</option>
                        <option value={'continue'}>종료일 없이 계속 게재</option>
                      </Select>
                    </SelectWrapper>
                    <SelectWrapper>
                      {watchType === 'expired' && (
                        <DateInput
                          type="date"
                          min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                          value={watchExpiresAt}
                          {...register('expiresAt')}
                        />
                      )}
                    </SelectWrapper>
                  </SelectWrapper>
                </Card>
                <Card title='일일 예산'>
                  <SliderWrapper>
                    <h2>{watchDailyBudget} 원</h2>
                    <Input
                      type="range"
                      min="2000"
                      max="200000"
                      step="1000"
                      name="dailyBudget"
                      {...register('dailyBudget')}
                    />
                  </SliderWrapper>
                </Card>
              </InputWrapper>
            </ContentWrapper>
            <ContentWrapper width="360px">
              <Estimate>
                <ADPreviewButton
                  type="button"
                  onClick={() => setIsAdPreview(true)}
                >
                  <span>광고 미리보기</span>
                </ADPreviewButton>
                <Divider />
                <DailyEstimateResultsWrapper>
                  <span>일일 추산 결과</span>
                  <DailyEstimateResultsContainer>
                    <span>도달</span>
                    <DailyEstimateResults>
                      {watchDailyBudget * 10 / 100} ~ {watchDailyBudget * 30 / 100}
                    </DailyEstimateResults>
                  </DailyEstimateResultsContainer>
                  <DailyEstimateResultsContainer>
                    <span>링크 클릭</span>
                    <DailyEstimateResults>
                      {watchDailyBudget * 1.5 / 100} ~ {watchDailyBudget * 4 / 100}
                    </DailyEstimateResults>
                  </DailyEstimateResultsContainer>
                </DailyEstimateResultsWrapper>
                <Divider />
                <Message>
                  <span>결제 요약</span>
                </Message>
                <Message>
                  <span>
                    결제금액 : {watchDailyBudget}원 * {campaignDuration}일 = {watchDailyBudget * campaignDuration}원
                  </span>
                </Message>
              </Estimate>
              <ButtonWrapper>
                <Button type="submit">
                  <span>시작하기</span>
                </Button>
              </ButtonWrapper>
            </ContentWrapper>
          </Form>
        </FormWrapper>
      </Container >
      {
        isAdPreview &&
        <Modal>
          <AdPreview
            imageUrl={imageUrl}
            setIsAdPreview={setIsAdPreview}
          />
        </Modal>
      }
    </>
  );
}

CampaignForm.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
