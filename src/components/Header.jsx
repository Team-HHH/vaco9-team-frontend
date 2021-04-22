import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../css/color';
import GlobalFonts from '../fonts/fonts';

const Container = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: ${color.SUB_COLOR};
`;

const LeftHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
`;

const RightHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
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
  font-family: 'NanumBarunGothicBold';
  color: ${color.MAIN_FONT_COLOR};
  &:hover {
    color: ${color.BOLD_COLOR};
  }
`;

export default function Header() {
  return (
    <Container>
      <GlobalFonts />
      <LeftHeader>
        <HeaderItem>Logo</HeaderItem>
        <HeaderItem>
          <HeaderLink to="/campaign/category">
            캠페인 유형
          </HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <HeaderLink to="/price">
            비용
          </HeaderLink>
        </HeaderItem>
      </LeftHeader>
      <RightHeader>
        <HeaderItem>
          <HeaderLink to="/dashboard">
            대시보드
          </HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <HeaderLink to="/campaign/new">
            캠페인 시작하기
          </HeaderLink>
        </HeaderItem>
        <HeaderItem>
          <HeaderLink to="/login">
            로그인
          </HeaderLink>
        </HeaderItem>
      </RightHeader>
    </Container>
  );
}
