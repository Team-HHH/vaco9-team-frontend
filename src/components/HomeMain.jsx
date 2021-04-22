import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import mainImg from '../assets/mainImg.png';
import Footer from './Footer';
import { color } from '../css/color';

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100%;
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
  // justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height || '50%'};
  margin: auto;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 50%;
  height: 50%;
  margin: 20% 0 0 0;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 0;
  border: none;
  background-color: ${color.POINT_COLOR};
  &:hover {
    background-color: ${color.SUB_POINT_COLOR};
    color: black;
  }
  &:focus {
    outline: none;
  }
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
              헬스케어 기업을 위한<br />
              최적의 광고 플랫폼
            </h2>
            <article
            >니즈가 명확한 고객을 확보하세요</article
            >
            <Button onClick={handleCampaignButtonClick}>
              캠페인 시작하기
            </Button>
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <ImgContainer>
            <img src={mainImg} alt="mainImg" />
          </ImgContainer>
        </ContentWrapper>
      </HomeSection>
      <HomeSection>
        <ContentWrapper>
          <Content>
            <h2>
              내 비지니스에<br />
              적합한 예산을<br />
              설정하세요
            </h2>
            <article
            >
              Google Ads는 광고 예산의 규모에 상관없이 이용할 수 있습니다.<br />
              월예산 한도를 설정하면 그 이상 지출되는 경우가 없습니다. <br />
              또한 언제든지 지출을 일시중지하거나 조정할 수 있습니다.
            </article
            >
          </Content>
        </ContentWrapper>
        <ContentWrapper>
          <ImgContainer>
            <img src={mainImg} alt="mainImg" />
          </ImgContainer>
        </ContentWrapper>
      </HomeSection>
      <HomeSection>
        <Content height="100%">
          <h2>서비스 이름과 함께 딱 맞는 고객에게 다가가세요.</h2>
          <ImgContainer>
            <img src={mainImg} alt="mainImg" />
          </ImgContainer>
          <article
          >서비스 Ads를 사용하면 예산 내에서 관련성 높은 고객에게 더 많이 도달할 수 있습니다.</article
          >
        </Content>
      </HomeSection>
      <Footer />
    </HomeWrapper>
  );
}
