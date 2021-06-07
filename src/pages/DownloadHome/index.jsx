import React from 'react';

import electron from '../../assets/electron.png';
import vaco from '../../assets/vaco.png';
import feature from '../../assets/feature.png';
import { DownloadHome as S } from './styles';

export default function DownloadHome() {
  return (
    <S.Container>
      <S.Header>
        <S.LeftSection>
          <S.HeaderItemWrapper>
            <S.HeaderItem fontSize="30px" onClick={scrollTop}>Flexilis</S.HeaderItem>
          </S.HeaderItemWrapper>
        </S.LeftSection>
        <S.RightSection>
          <S.HeaderItemWrapper>
            <S.HeaderItem onClick={scrollBottom}>Feature</S.HeaderItem>
          </S.HeaderItemWrapper>
          <S.HeaderItemWrapper>
            <S.HeaderLink to="/main">앱에 광고 등록하기</S.HeaderLink>
          </S.HeaderItemWrapper>
        </S.RightSection>
      </S.Header>
      <S.HomeSection>
        <S.Title>스트레칭, Flexilis와 함께</S.Title>
        <S.SubTitle>Flexilis는 스트레칭 알람 데스크탑 앱입니다.</S.SubTitle>
        <S.DownloadLink href={process.env.REACT_APP_DOWNLOAD_URL} download>
          Download Now
        </S.DownloadLink>
        <S.Image width="840px" height="500px" src={electron} alt="electron" />
      </S.HomeSection>
      <S.Feature onClick={scrollBottom} margin="70px">
        <S.Title>Feature</S.Title>
        <S.FeatureWrapper>
          <div>
            <S.Image width="640px" height="420px" src={feature} alt="feature" />
          </div>
          <div>
            <S.ParagraphWrapper>
              <h3>원하는 시간에 스트레칭 알림을 받고싶으셨나요?</h3>
              <S.Paragraph>Flexilis는 부위별 스트레칭 영상과 함께<br />
              알람이 등록된 시간에 선택한 부위의 스트레칭 영상이 팝업으로 재생됩니다.<br />
              커스텀 영상으로 나만의 스트레칭 루틴을 만들어보세요.<br />
              팝업 3분 전 푸시 알람을 띄워줍니다.<br />
              </S.Paragraph>
            </S.ParagraphWrapper>
          </div>
        </S.FeatureWrapper>
      </S.Feature>
      <S.Feature margin="20px">
        <S.SubTitle>Sponsored By</S.SubTitle>
        <S.Logo src={vaco} alt="vaco" />
      </S.Feature>
    </S.Container>
  );
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollBottom() {
  window.scrollTo({ top: 870, behavior: 'smooth' });
}
