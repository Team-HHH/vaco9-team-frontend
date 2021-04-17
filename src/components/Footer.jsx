import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100px;
  height: fit-content;
  background-color: gray;
`;

const FooterItem = styled.div`
  display: flex;
  width: fit-content;
  margin: auto;
`;

export default function Footer() {
  return (
    <Container>
      <FooterItem>
        회사 로고
      </FooterItem>
      <FooterItem>
        회사 정보
      </FooterItem>
      <FooterItem>
        고객센터
      </FooterItem>
    </Container>
  );
}
