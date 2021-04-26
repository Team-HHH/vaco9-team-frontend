import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logo from '../assets/logo.png';

const SplitLayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 30%;
  background-color: white;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  background-color: ${props => props.theme.SUB};
`;

const LogoWrapper = styled.div`
  margin-top: 8%;
  text-align: center;
`;

const Logo = styled.img`
  width: 500px;
  padding: 3px;
`;

const Slogan = styled.p`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 40px;
  color: white;
  margin: 0;
`;

export default function SplitLayout({ children }) {
  return (
    <SplitLayoutWrapper>
      <LeftSection>{children}</LeftSection>
      <RightSection>
        <LogoWrapper>
          <Logo src={logo} />
          <Slogan>Flexilis</Slogan>
          <Slogan>헬스케어 기업을 위한 최적의 광고 플랫폼</Slogan>
        </LogoWrapper>
      </RightSection>
    </SplitLayoutWrapper>
  );
}

SplitLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
