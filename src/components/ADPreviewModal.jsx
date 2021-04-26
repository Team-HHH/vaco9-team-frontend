import React from 'react';
import styled from 'styled-components';
import popupVideoImage from '../assets/popup-video-image-mockup.jpg';
import { color } from '../css/color';

const ADPreviewModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
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

const ADPreviewModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: white;
  padding: 1rem;
  width: 700px;
  height: 500px;
  border-radius: 20px;
  font-family: 'Nanum Barun Gothic';
`;

const ADPreviewModalTitle = styled.span`
  font-size: 18px;
`;

const ADPreviewModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin: 10px;
`;

const ADPreviewModalPopup = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const ADPreviewModalPopupImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ADPreviewModalBanner = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;

const ADPreviewModalBannerImage = styled.img`
  width: 100%;
  height: 100%;
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

const ADPreviewModal = ({ imageUrl, setIsPreviewModal }) => {
  return (
    <ADPreviewModalWrapper>
      <ADPreviewModalContainer>
        <ADPreviewModalTitle>광고 미리보기</ADPreviewModalTitle>
        <ADPreviewModalImageContainer>
          <ADPreviewModalPopup>
            <ADPreviewModalPopupImage src={popupVideoImage} />
          </ADPreviewModalPopup>
          <ADPreviewModalBanner>
            {imageUrl && <ADPreviewModalBannerImage src={imageUrl} />}
          </ADPreviewModalBanner>
        </ADPreviewModalImageContainer>
        <CloseButton onClick={() => setIsPreviewModal(false)}>확인</CloseButton>
      </ADPreviewModalContainer>
    </ADPreviewModalWrapper>
  );
};

export default ADPreviewModal;
