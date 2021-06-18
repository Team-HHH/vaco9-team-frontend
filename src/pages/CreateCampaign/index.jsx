import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CreateCampaign as S } from './styles';
import Header from '../../components/Header';
import CampaignForm from '../../components/CampaignForm';
import { requestPay } from '../../utils/requestPay';
import { checkFileSize } from '../../utils/index';
import { errorOccured } from '../../reducers/error';
import { getEstimate } from '../../reducers/estimate';
import { fetchImageFile } from '../../apis/image';
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
  const user = useSelector(state => state.user);
  const estimate = useSelector(state => state.estimate);
  const dispatch = useDispatch();

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
    try {
      const response = await fetchNewCampaign({
        ...data,
        ...targetData,
        content: url,
      });
      const responseBody = await response.json();
      const { merchantId } = responseBody.data;

      if (!response.ok) {
        dispatch(errorOccured('캠페인 생성에 실패했습니다.'));
        return;
      }

      requestPay({
        merchantId,
        title: data.title,
        dailyBudget: targetData.dailyBudget,
        expiresAt: data.expiresAt,
        userEmail: user.email,
        userName: user.name,
      }, '/dashboard', dispatch);
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
