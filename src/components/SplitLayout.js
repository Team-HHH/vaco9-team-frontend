import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SplitLayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 30%;
  background-color: #F5F5F5;
`;

const RightSection = styled.div`
  width: 70%;
  color: green;
`;

export default function SplitLayout({ leftContent, rightContent }) {
  return (
    <SplitLayoutWrapper>
      <LeftSection>{leftContent}</LeftSection>
      <RightSection>{rightContent}</RightSection>
    </SplitLayoutWrapper>
  );
}

SplitLayout.propTypes = {
  leftContent: PropTypes.element.isRequired,
  rightContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
};
