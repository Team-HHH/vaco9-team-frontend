import React from 'react';
import { useHistory } from 'react-router-dom';

import { HomeMain as S } from './styles';
import mainImg from '../../assets/mainImg.jpeg';

export default function HomeMain() {
  const history = useHistory();

  function handleCampaignButtonClick() {
    history.push('/campaign/new');
  }

  return (
    <S.HomeWrapper>
      <S.HomeSection>
        <S.ContentWrapper>
          <S.Content>
            <S.Title>
              헬스케어 기업을 위한<br />
              최적의 광고 플랫폼
            </S.Title>
            <S.SubTitle>
              니즈가 명확한 고객을 확보하세요
            </S.SubTitle>
            <S.Button onClick={handleCampaignButtonClick}>
              <S.ButtonText>
                캠페인 시작하기
              </S.ButtonText>
            </S.Button>
          </S.Content>
        </S.ContentWrapper>
        <S.ContentWrapper>
          <S.ImgContainer>
            <img src={mainImg} alt="mainImg" />
          </S.ImgContainer>
        </S.ContentWrapper>
      </S.HomeSection>
    </S.HomeWrapper>
  );
}
