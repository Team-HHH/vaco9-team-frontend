import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  min-width: 900px;
  font-family: 'Nanum Barun Gothic';
  font-size: 18px;
`;

const LeftHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

const RightHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

const HeaderItem = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin: auto 30px;
`;

const HeaderLink = styled(Link)`
  display: flex;
  height: fit-content;
  margin: auto;
  justify-content: center;
  align-content: center;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: 'gray';
  }
`;

const HomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
`;

const Title = styled.h1`
  margin: 0;
`;

const SubTitle = styled.span`
margin: 24px;
`;

const DownloadButton = styled.button`
  cursor: pointer;
    font-size: 18px;
    font-weight: 300;
  border-radius: 4px;
    min-width: 150px;
    padding: 20px 40px;
    margin-top: 20px;
`;

export default function DownloadHome() {
  return (
    <Container>
      <Header>
        <LeftHeader>
          <HeaderItem>
            <HeaderLink>Flexilis</HeaderLink>
          </HeaderItem>
        </LeftHeader>
        <RightHeader>
          <HeaderItem>
            <HeaderLink to="/">Feature</HeaderLink>
          </HeaderItem>
          <HeaderItem>
            <HeaderLink to="/campaign/new">앱에 광고 등록하기</HeaderLink>
          </HeaderItem>
        </RightHeader>
      </Header>
      <HomeSection>
        <Title>스트레칭, Flexilis와 함께</Title>
        <SubTitle>Flexilis는 스트레칭 알람 데스크탑 앱입니다.</SubTitle>
        <DownloadButton>Download Now</DownloadButton>
      </HomeSection>
    </Container>
  );
}
