import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { BsCloudUpload } from 'react-icons/bs';
import { parseISO, differenceInCalendarDays, format, addDays } from 'date-fns';
import Select from 'react-select';

import { CampaignForm as S } from './styles';
import Card from '../Card';
import Modal from '../Modal';
import AdPreview from '../AdPreview';
import { campaignCountries } from '../../constants';

export default function CampaignForm({
  estimate,
  imageUrl,
  targetData,
  setTargetData,
  onImageUpload,
  onFormSubmit,
}) {
  const [isAdPreview, setIsAdPreview] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    control,
  } = useForm();
  const watchType = watch('expiresType', 'expired');
  const watchExpiresAt = watch('expiresAt', format(addDays(new Date(), 5), 'yyyy-MM-dd'));
  const campaignDuration = differenceInCalendarDays(parseISO(watchExpiresAt), new Date());

  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <S.TitleWrapper>
          <S.Title>캠페인 시작하기</S.Title>
        </S.TitleWrapper>
        <S.UploaderWrapper>
          <S.Uploader
            onSubmit={onImageUpload}
            encType="multipart/form-data"
          >
            <S.UploadLabel htmlFor="file">이미지 선택</S.UploadLabel>
            <input
              type="file"
              id="file"
              name="image"
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg,image/gif'
            />
            <S.UploadBar>
              <S.UploadInput type="submit" value="업로드" />
              <BsCloudUpload size={20} style={{ color: imageUrl ? 'green' : 'red', margin: '10px 10px 10px 20px' }} />
            </S.UploadBar>
          </S.Uploader>
        </S.UploaderWrapper>
        <S.FormWrapper>
          <S.Form onSubmit={handleSubmit(onFormSubmit)}>
            <S.ContentWrapper>
              <S.InputWrapper>
                <Card title="캠페인 제목">
                  <S.Input
                    type="text"
                    name="title"
                    accept=".jpg,.png,.jpeg"
                    {...register('title')}
                  />
                </Card>
                <Card title="캠페인 타입">
                  <S.SelectWrapper>
                    <S.CustomSelect
                      name="campaignType"
                      {...register('campaignType')}
                    >
                      <option value={'banner'}>배너</option>
                      <option value={'text'}>텍스트</option>
                      <option value={'video'}>비디오</option>
                    </S.CustomSelect>
                  </S.SelectWrapper>
                </Card>
                <Card title="웹 사이트 주소">
                  <S.Input
                    type="text"
                    name="campaignUrl"
                    {...register('campaignUrl')}
                  />
                </Card>
                <Card title="배너 이미지 추가하기">
                  <S.UploaderAddImageContainer>
                    <S.UploaderAddImageRule>이미지 업로드는 최대 1MB까지 가능합니다.</S.UploaderAddImageRule>
                    <S.UploaderAddImageRule>이미지 선택 후 '업로드'를 클릭하세요.</S.UploaderAddImageRule>
                  </S.UploaderAddImageContainer>
                </Card>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.TargetSettingHeader>
                  <S.TargetTitle>타겟</S.TargetTitle>
                  <S.TargetSubTitle>누구에게 광고를 내보내시겠어요?</S.TargetSubTitle>
                </S.TargetSettingHeader>
                <S.TargetSettingAge>
                  <S.Label>나이</S.Label>
                  <Controller
                    control={control}
                    name="minAge"
                    render={({ onChange, name }) => (
                      <S.Input
                        width={'22%'}
                        type="number"
                        min="18"
                        max="65"
                        name={name}
                        onChange={(event) => {
                          setTargetData({
                            ...targetData,
                            minAge: event.target.value,
                          });
                        }}
                      />
                    )}
                  />
                  <S.LimitText>세 이상</S.LimitText>
                  <Controller
                    control={control}
                    name="maxAge"
                    render={({ onChange, name }) => (
                      <S.Input
                        width={'22%'}
                        type="number"
                        min="18"
                        max="65"
                        name={name}
                        onChange={(event) => {
                          setTargetData({
                            ...targetData,
                            maxAge: event.target.value,
                          });
                        }}
                      />
                    )}
                  />
                  <S.LimitText>세 이하</S.LimitText>
                </S.TargetSettingAge>
                <S.TargetSettingGenderAndCountry>
                  <S.Label>성별</S.Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ onChange, name }) => (
                      <S.TargetGenderAndCountrySelect
                        name={name}
                        onChange={(event) => {
                          setTargetData({
                            ...targetData,
                            gender: event.target.value,
                          });
                        }}
                      >
                        <option value='male'>남성</option>
                        <option value='female'>여성</option>
                        <option value='both'>모두</option>
                      </S.TargetGenderAndCountrySelect>
                    )}
                  />
                </S.TargetSettingGenderAndCountry>
                <S.TargetSettingGenderAndCountry>
                  <S.Label>국가</S.Label>
                  <S.ReactSelectWrapper>
                    <Select
                      onChange={(selectedOption) => {
                        setTargetData({
                          ...targetData,
                          country: selectedOption,
                        });
                      }}
                      options={campaignCountries}
                      isMulti
                    />
                  </S.ReactSelectWrapper>
                </S.TargetSettingGenderAndCountry>
              </S.InputWrapper>
              <S.InputWrapper>
                <Card title="기간">
                  <S.EndDateWrapper>
                    <S.EndDateOption>
                      <S.CustomSelect
                        name="expiresType"
                        defaultValue="expired"
                        {...register('expiresType')}
                      >
                        <option value={'expired'}>종료일 선택</option>
                        <option value={'continue'}>종료일 없이 계속 게재</option>
                      </S.CustomSelect>
                    </S.EndDateOption>
                    <S.EndDateSetting>
                      {watchType === 'expired' && (
                        <S.DateInput
                          type="date"
                          min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                          value={watchExpiresAt}
                          {...register('expiresAt')}
                        />
                      )}
                    </S.EndDateSetting>
                  </S.EndDateWrapper>
                </Card>
                <Card title='일일 예산'>
                  <S.SliderWrapper>
                    <S.SliderPrice>{(targetData.dailyBudget * 1).toLocaleString()} 원</S.SliderPrice>
                    <Controller
                      control={control}
                      name="dailyBudget"
                      render={({ onChange, name }) => (
                        <S.Slider
                          type="range"
                          min="5000"
                          max="200000"
                          step="5000"
                          name={name}
                          onChange={(event) => {
                            setTargetData({
                              ...targetData,
                              dailyBudget: event.target.value,
                            });
                          }}
                        />
                      )}
                    />
                  </S.SliderWrapper>
                </Card>
              </S.InputWrapper>
            </S.ContentWrapper>
            <S.EstimateWrapper>
              <S.Estimate>
                <S.Divider />
                <S.ADPreviewButton
                  type="button"
                  onClick={() => setIsAdPreview(true)}
                >
                  <span>광고 미리보기</span>
                </S.ADPreviewButton>
                <S.Divider />
                <S.DailyEstimateResultsWrapper>
                  <S.DailyEstimateResultsTitle>
                    일일 추산 결과
                  </S.DailyEstimateResultsTitle>
                  <S.DailyEstimateResultsContainer>
                    <S.DailyEstimateReachAndClick>도달</S.DailyEstimateReachAndClick>
                    <S.DailyEstimateResults>
                      {estimate.cpm ? `${(Math.floor(targetData.dailyBudget / estimate.cpm * 1000 * 0.95)).toLocaleString()} ~ ${(Math.floor(targetData.dailyBudget / estimate.cpm * 1000 * 1.05)).toLocaleString()}명` : '타겟을 설정하세요'}
                    </S.DailyEstimateResults>
                  </S.DailyEstimateResultsContainer>
                  <S.DailyEstimateResultsContainer>
                    <S.DailyEstimateReachAndClick>링크 클릭</S.DailyEstimateReachAndClick>
                    <S.DailyEstimateResults>
                      {estimate.cpm ? `${(Math.floor(targetData.dailyBudget / estimate.cpc * 0.95)).toLocaleString()} ~ ${(Math.floor(targetData.dailyBudget / estimate.cpc * 1.05)).toLocaleString()}명` : '타겟을 설정하세요'}
                    </S.DailyEstimateResults>
                  </S.DailyEstimateResultsContainer>
                </S.DailyEstimateResultsWrapper>
                <S.Divider />
                <S.PaymentSummaryContainer>
                  <S.PaymentSummaryText>결제 요약</S.PaymentSummaryText>
                  <S.PaymentSummarySubText>광고가 {campaignDuration}일 동안 게재됩니다.</S.PaymentSummarySubText>
                </S.PaymentSummaryContainer>
                <S.PaymentAmountContainer>
                  <S.PaymentAmountDescription>
                    <S.PaymentAmountText>총 결제금액</S.PaymentAmountText>
                    <S.PaymentAmountSubText>일일 {(targetData.dailyBudget * 1).toLocaleString()}원X{campaignDuration}일</S.PaymentAmountSubText>
                  </S.PaymentAmountDescription>
                  <S.TotalPaymentAmout>{(targetData.dailyBudget * campaignDuration).toLocaleString()} 원</S.TotalPaymentAmout>
                </S.PaymentAmountContainer>
              </S.Estimate>
              <S.ButtonWrapper>
                <S.Button type="submit">
                  <span>시작하기</span>
                </S.Button>
              </S.ButtonWrapper>
            </S.EstimateWrapper>
          </S.Form>
        </S.FormWrapper>
      </S.Container >
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
  estimate: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
  targetData: PropTypes.object.isRequired,
  setTargetData: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
