import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from '../css/color';

const SplitLayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 30%;
  background-color: white;
`;

const RightSection = styled.div`
  width: 70%;
  background-color: ${color.SUB_COLOR};
`;

export default function SplitLayout({ children, }) {
  return (
    <SplitLayoutWrapper>
      <LeftSection>{children}</LeftSection>
      <RightSection />
    </SplitLayoutWrapper>
  );
}

SplitLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
