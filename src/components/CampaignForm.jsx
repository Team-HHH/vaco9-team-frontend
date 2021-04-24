import React, { useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import Card from './Card';
import { color } from '../css/color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: 80px;
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
  border: 1px solid ${color.OUTLINE};
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;s
`;

const UploaderPadding = styled.div`
  height: 40px;
`;

const UploaderWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 500px;
  z-index : 1;
`;

const Uploader = styled.form`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 260px;
  left: 30px;
  width: 500px;
  height: fit-content;
  z-index: 1;
`;

const UploadLabel = styled.label`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #efefef;
  font-size: 14px;
`;

const UploadInput = styled.input`
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
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
  border: 1px solid ${color.OUTLINE};
  border-radius: 0.4rem;
  background-color: #f9f9f9;
  padding: 10px;
`;

const DateInput = styled.input`
  margin: 10px 0;
  border: 1px solid ${color.OUTLINE};
	padding: 10px 15px;
	width: 93%;
  border-radius: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
	border: 1px solid ${color.OUTLINE};
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

const HiddenInput = styled.input`
  display: none;
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
  background-color: ${color.SUB};
  &:hover {
    background-color: ${color.MAIN};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 10px 0;
  background-color: ${color.OUTLINE}
`;

export default function CampaignForm({ imageUrl, onImageUpload, onFormSubmit }) {
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
      <UploaderWrapper>
        <Uploader
          onSubmit={onImageUpload}
          encType="multipart/form-data"
        >
          <UploadLabel htmlFor="file">배너 이미지 선택</UploadLabel>
          <input
            type="file"
            id="file"
            name="image"
            style={{ display: "none" }}
            accept='image/jpg,impge/png,image/jpeg,image/gif'
          />
          <UploadInput type="submit" value="업로드" />
        </Uploader>
      </UploaderWrapper>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <ContentWrapper>
            <InputWrapper>
              <HiddenInput
                type="text"
                name="content"
                value={imageUrl}
                {...register('content')}
              />
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
              <Card title="배너이미지 추가하기">
                <UploaderPadding />
              </Card>
            </InputWrapper>
            <InputWrapper>
              <Card title='기간'>
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
                    min="100"
                    max="50000"
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
              <Message>광고 미리보기</Message>
              {imageUrl && <img src={imageUrl} height="120" width="280" />}
              <Divider />
              <Message>일일 추산 결과</Message>
              <Divider />
              <Message>결제 요약</Message>
              <Message>결제금액 : {watchDailyBudget}원 * {campaignDuration}일 = {watchDailyBudget * campaignDuration}</Message>
            </Estimate>
            <ButtonWrapper>
              <Button type="submit">시작하기</Button>
            </ButtonWrapper>
          </ContentWrapper>
        </Form>
      </FormWrapper>
    </Container >
  );
}
