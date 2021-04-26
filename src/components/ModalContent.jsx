import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color } from '../css/color';

const ModalContainer = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContentWrapper = styled.div`
  display:flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
  background-color: ${color.WHITE};
  font-family: 'Nanum Barun Gothic Bold';
`;

const CloseButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background-color: ${color.SUB};
  &:hover {
    background-color: ${color.HOVER}
  }
`;

export default function ModalContent({ errorType, onHideModalClick }) {
  return (
    <ModalContainer>
      <ModalContentWrapper>
        <div>{errorType}</div>
        <CloseButton
          onClick={onHideModalClick}
        >hide modal</CloseButton>
      </ModalContentWrapper>
    </ModalContainer>
  );
}

ModalContent.propTypes = {
  errorType: PropTypes.string.isRequired,
  onHideModalClick: PropTypes.func.isRequired,
};
