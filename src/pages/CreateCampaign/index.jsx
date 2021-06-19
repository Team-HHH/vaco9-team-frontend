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
import { campaignMessage, imageUploadMessage } from '../../constants/message';

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
        dispatch(errorOccured(campaignMessage.CAMPAIGN_CREATION_FAILED));
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
      dispatch(errorOccured(campaignMessage.CAMPAIGN_CREATION_FAILED));
    }
  }

  async function handleImageUpload(event) {
    event.preventDefault();

    const data = new FormData();
    const file = event.target.image.files[0];

    if (!file) {
      dispatch(errorOccured(imageUploadMessage.FILE_NOT_EXIST));
      return;
    }

    if (!checkFileSize(file)) {
      dispatch(errorOccured(imageUploadMessage.MAXIMIM_FILE_SIZE_EXCEEDED));
      return;
    }

    data.append('image', file);

    try {
      const response = await fetchImageFile(data);
      const responseBody = await response.json();
      const url = responseBody.data.url;

      setUrl(url);
    } catch (error) {
      dispatch(errorOccured(imageUploadMessage.FILE_UPLOAD_FAILED));
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
