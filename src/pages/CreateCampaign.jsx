import React, { useState } from 'react';
import styled from 'styled-components';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import CampaignForm from '../components/CampaignForm';
import { fetchPaymentResult } from '../apis/payment';
import { fetchNewCampaign } from '../apis/campaigns';
import { fetchImageFile } from '../apis/image';
import { checkFileSize } from '../utils/index';
import { errorOccured } from '../reducers/error';
import { getEstimate } from '../reducers/target';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function CreateCampaign() {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  async function handleNewCampaignFormSubmit(data) {
    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMPORT_ID);

    const campaignDuration = differenceInCalendarDays(parseISO(data.expiresAt), new Date());

    try {
      const response = await fetchNewCampaign({ ...data, content: url });
      const responseBody = await response.json();

      if (!response.ok) {
        dispatch(errorOccured('캠페인 생성에 실패했습니다.'));
        return;
      }

      const { merchantId } = responseBody.data;

      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: merchantId,
        name: data.title,
        amount: data.dailyBudget * campaignDuration,
        buyer_email: user.email,
        buyer_name: user.name,
      }, async (rsp) => {
        if (rsp.success) {
          const { imp_uid, merchant_uid } = rsp;
          const response = await fetchPaymentResult({ imp_uid, merchant_uid });

          if (!response.ok) {
            dispatch(errorOccured('결제에 실패했습니다.'));
            return;
          }

          dispatch(errorOccured('캠페인 생성이 완료되었습니다.', '/dashboard'));
        } else {
          dispatch(errorOccured('결제에 실패했습니다.'));
          return;
        }
      });
    } catch (err) {
      dispatch(errorOccured('캠페인 생성에 실패했습니다.'));
    }
  }

  async function handleImageUpload(e) {
    e.preventDefault();

    const data = new FormData();
    const file = e.target.image.files[0];

    if (!file) {
      dispatch(errorOccured('파일이 존재하지 않습니다.'));
      return;
    }

    if (!checkFileSize(file)) {
      dispatch(errorOccured('파일이 최대 크기(150KB)를 초과하였습니다.'));
      return;
    }

    data.append('image', file);

    try {
      const response = await fetchImageFile(data);
      const responseBody = await response.json();
      const url = responseBody.data.url;

      setUrl(url);
    } catch (error) {
      dispatch(errorOccured('파일 업로드에 실패하였습니다.'));
    }
  }

  function handleSliderChange(data) {
    dispatch(getEstimate(data));
  }

  return (
    <>
      <Header />
      <Container>
        <CampaignForm
          imageUrl={url}
          onImageUpload={handleImageUpload}
          onSliderChange={handleSliderChange}
          onFormSubmit={handleNewCampaignFormSubmit}
        />
      </Container>
    </>
  );
}
