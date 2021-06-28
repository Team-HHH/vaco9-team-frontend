import React from 'react';
import PropTypes from 'prop-types';

import { ModalContent as S } from './styles';

export default function ModalContent({ errorType, onCloseButtonClick }) {
  return (
    <S.ModalContainer>
      <S.ModalContentWrapper>
        <div>{errorType}</div>
        <S.CloseButton onClick={onCloseButtonClick} >
          <span>Close</span>
        </S.CloseButton>
      </S.ModalContentWrapper>
    </S.ModalContainer>
  );
}

ModalContent.propTypes = {
  errorType: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};
