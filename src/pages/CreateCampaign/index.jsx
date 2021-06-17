import React, { useState, useEffect } from 'react';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import { CreateCampaign as S } from './styles';
import Header from '../../components/Header';
import CampaignForm from '../../components/CampaignForm';
import { checkFileSize } from '../../utils/index';
import { errorOccured } from '../../reducers/error';
import { getEstimate } from '../../reducers/estimate';
import { fetchImageFile } from '../../apis/image';
import { fetchPaymentResult } from '../../apis/payment';
import { fetchNewCampaign } from '../../apis/campaigns';

export default function CreateCampaign() {
  const [url, setUrl] = useState('');
  const [targetData, setTargetData] = useState({
    minAge: null,
    maxAge: null,
    gender: 'male',
    country: null,
    dailyBudget: '5000',
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const estimate = useSelector(state => state.estimate);

  useEffect(() => {
    const selectedTarget = { ...targetData };

    for (const key in selectedTarget) {
      if (!selectedTarget[key]) {
        return;
      }
    }

    dispatch(getEstimate(selectedTarget));
  }, [targetData]);

  async function handleNewCampaignFormSubmit(data) {
    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMPORT_ID);

    const campaignDuration = differenceInCalendarDays(parseISO(data.expiresAt), new Date());

    try {
      const response = await fetchNewCampaign({
        ...data,
        ...targetData,
        content: url,
      });
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
        amount: targetData.dailyBudget * campaignDuration,
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

  async function handleImageUpload(event) {
    event.preventDefault();

    const data = new FormData();
    const file = event.target.image.files[0];

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

  return (
    <S.Container>
      <Header />
      <CampaignForm
        estimate={estimate}
        imageUrl={url}
        targetData={targetData}
        setTargetData={setTargetData}
        onImageUpload={handleImageUpload}
        onFormSubmit={handleNewCampaignFormSubmit}
      />
    </S.Container>
  );
}
