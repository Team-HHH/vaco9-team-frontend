import React from 'react';
import styled from 'styled-components';

const ModalContentWrapper = styled.div`
  background-color: white;
  width: 500px;
  height: 300px;
`;

export default function ModalContent({ message, onHideModalClick }) {
  return (
    <ModalContentWrapper>
      <div>{message}</div>
      <button
        onClick={onHideModalClick}
      >hide modal</button>
    </ModalContentWrapper>
  );
}
