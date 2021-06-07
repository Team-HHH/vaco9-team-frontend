import styled, { createGlobalStyle } from 'styled-components';

export const CampaignForm = {};

CampaignForm.GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.CAMPAIGN_FORM_BACKGROUND};
  }
`;

CampaignForm.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
  font-family: 'Nanum Barun Gothic';
`;

CampaignForm.TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 30px;
  padding: 25px 25px 25px 0;
`;

CampaignForm.Title = styled.span`
  margin: 10px;
`;

CampaignForm.FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  margin-bottom: 50px;
`;

CampaignForm.ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '600px'};
  margin: 0 100px 0 0;
`;

CampaignForm.EstimateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 360px;
  margin: 0 100px 0 0;
`;

CampaignForm.InputWrapper = styled.div`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
`;

CampaignForm.UploaderWrapper = styled.section`
  height: 0;
`;

CampaignForm.UploaderAddImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 3px;
  left: 33%;
`;

CampaignForm.UploaderAddImageRule = styled.span`
  font-size: 10px;
  padding-bottom: 3px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

CampaignForm.Uploader = styled.form`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 400px;
  left: 45px;
  width: 500px;
`;

CampaignForm.UploadLabel = styled.label`
  margin-left: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

CampaignForm.UploadInput = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

CampaignForm.UploadBar = styled.div`
  display: flex;
`;

CampaignForm.Form = styled.form`
  display: flex;
`;

CampaignForm.SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

CampaignForm.CustomSelect = styled.select`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.BACKGROUND};
  padding: 10px;
  cursor: pointer;
  outline: none;
`;

CampaignForm.DateInput = styled.input`
  margin: 10px 0;
  border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
	width: 93%;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
`;

CampaignForm.Input = styled.input`
	border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
  width: ${props => props.width ? props.width : '100%'};
  border-radius: 0.4rem;
  &:focus {
    outline: none;
  }
`;

CampaignForm.SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

CampaignForm.Slider = styled.input`
  appearance: none;
  cursor: pointer;
  &::-webkit-slider-runnable-track {
    height: 5px;
    width: 100%;
    cursor: pointer;
    pointer-events: none;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background-color: #f9f9f9;
    border-radius: 2px;
    border: 1px solid #000101;
  }
  &::-webkit-slider-thumb {
    height: 16px;
    width: 16px;
    appearance: none;
    background: #fff;
    border-radius: 8px;
    margin-top: -6px;
    border: 1px solid #c77;
  }
  &:active::-webkit-slider-thumb {
    background: ${props => props.theme.HOVER};
  }
  &:focus {
    outline: none;
  }
`;

CampaignForm.SliderPrice = styled.span`
  align-self: center;
  font-size: 30px;
  margin: 20px;
`;

CampaignForm.Estimate = styled.div`
  display: flex;
  flex-direction: column;
`;

CampaignForm.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

CampaignForm.Button = styled.button`
  margin: 20px 0;
  width: 40%;
  padding: 10px 15px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

CampaignForm.Divider = styled.div`
  height: 1px;
  margin: 10px 0;
  background-color: ${props => props.theme.OUTLINE};
`;

CampaignForm.Label = styled.label`
  margin: 3px;
`;

CampaignForm.ADPreviewButton = styled.button`
  margin: 15px;
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

CampaignForm.DailyEstimateResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

CampaignForm.DailyEstimateResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

CampaignForm.DailyEstimateResultsTitle = styled.span`
  padding-bottom: 30px;
  font-size: 18px;
`;

CampaignForm.DailyEstimateReachAndClick = styled.span`
  align-self: center;
  font-size: 14px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

CampaignForm.DailyEstimateResults = styled.span`
  font-size: 20px;
  color: black;
`;

CampaignForm.LimitText = styled.span`
  font-size: 13px;
`;

CampaignForm.TargetSettingHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

CampaignForm.TargetTitle = styled.span`
  font-size: 23px;
`;

CampaignForm.TargetSubTitle = styled.span`
  margin-top: 10px;
  font-size: 13px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

CampaignForm.TargetSettingAge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
`;

CampaignForm.TargetSettingGenderAndCountry = styled.div`
  display: flex;
  align-items: center;
  margin: 4%;
`;

CampaignForm.TargetGenderAndCountrySelect = styled.select`
  margin-left: 5%;
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.BACKGROUND};
  padding: 10px;
  outline: none;
`;

CampaignForm.EndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

CampaignForm.EndDateOption = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
`;

CampaignForm.EndDateSetting = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
`;

CampaignForm.PaymentSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

CampaignForm.PaymentSummaryText = styled.span`
  font-size: 18px;
`;

CampaignForm.PaymentSummarySubText = styled.span`
  margin: 15px 0 0 1px;
  margin-top: 15px;
  font-size: 15px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

CampaignForm.PaymentAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px 10px 11px;
`;

CampaignForm.PaymentAmountDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

CampaignForm.PaymentAmountText = styled.span`
  font-size: 14px;
`;

CampaignForm.PaymentAmountSubText = styled.span`
  margin: 15px 0 0 1px;
  margin-top: 15px;
  font-size: 12px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

CampaignForm.TotalPaymentAmout = styled.span`
  font-size: 15px;
`;

CampaignForm.ReactSelectWrapper = styled.div`
  display: inline;
  margin-left: 5%;
  min-width: 30%;
  width: fit-content;
`;
