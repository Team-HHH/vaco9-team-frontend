import React from 'react';
import styled from 'styled-components';

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
  background-color: white;
  width: 500px;
  height: 300px;
  border-radius: 20px;
  font-family: 'Nanum Barun Gothic';
`;

export default function ModalContent({ errorType, onHideModalClick }) {
  return (
    <ModalContainer>
      <ModalContentWrapper>
        <div>{errorType}</div>
        <button
          onClick={onHideModalClick}
        >hide modal</button>
      </ModalContentWrapper>
    </ModalContainer>
  );
}
