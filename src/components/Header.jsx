import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../css/color';

const Container = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background-color: ${color.SUB};
  font-family: 'Nanum Barun Gothic';
  font-size: 18px;
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
  color: ${color.MAIN_FONT};
  &:hover {
    color: ${color.BOLD};
  }
`;

export default function Header() {
  return (
    <Container>
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
