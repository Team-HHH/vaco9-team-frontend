import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import mainImg from '../assets/mainImg.png';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 56px;
  height: calc(100vh - 80px);
`;

const HomeSection = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  margin: auto;
`;

export default function HomeMain() {
  const history = useHistory();
  const handleCampaignButtonClick = () => {
    history.push('/campaign/new');
  };

  return (
    <HomeWrapper>
      <HomeSection>
        <ContentWrapper>
          <Content>
            <h2>
              헬스케어 기업을 위한<br/>
              최적의 광고 플랫폼
            </h2>
            <span>니즈가 명확한 고객을 확보하세요</span>
            <button onClick={handleCampaignButtonClick}>
              캠페인 시작하기
            </button>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <img src={mainImg} alt="mainImg"/>
        </ContentWrapper>
      </HomeSection>
      <HomeSection>
        <ContentWrapper>
          <Content>
            <h2>
              내 비지니스에<br/>
              적합한 예산을<br/>
              설정하세요
            </h2>
            <span>
              Google Ads는 광고 예산의 규모에 상관없이 이용할 수 있습니다.<br/>
              월예산 한도를 설정하면 그 이상 지출되는 경우가 없습니다. <br/>
              또한 언제든지 지출을 일시중지하거나 조정할 수 있습니다.
            </span>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <img src={mainImg} alt="mainImg"/>
        </ContentWrapper>
      </HomeSection>
      <HomeSection>
        <Content>
          <h2>서비스 이름과 함께 딱 맞는 고객에게 다가가세요.</h2>
          <img src={mainImg} alt="mainImg"/>
          <span>서비스 Ads를 사용하면 예산 내에서 관련성 높은 고객에게 더 많이 도달할 수 있습니다.</span>
        </Content>
      </HomeSection>
    </HomeWrapper>
  );
}
