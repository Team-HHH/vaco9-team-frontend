import React from 'react';
import PropTypes from 'prop-types';

import { AdPreview as S } from './styles';
import popupVideoImage from '../../assets/popup-video-image-mockup.jpg';

export default function AdPreview({ imageUrl, setIsAdPreview }) {
  return (
    <S.Container>
      <S.Wrapper>
        <S.ImageContainer>
          <S.Popup>
            <S.PopupImage src={popupVideoImage} />
          </S.Popup>
          <S.Banner>
            {imageUrl && <S.BannerImage src={imageUrl} />}
          </S.Banner>
        </S.ImageContainer>
        <S.CloseButton onClick={() => setIsAdPreview(false)}>확인</S.CloseButton>
      </S.Wrapper>
    </S.Container>
  );
}

AdPreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  setIsAdPreview: PropTypes.func.isRequired,
};
