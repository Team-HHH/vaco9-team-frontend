import React from 'react';
import styled from 'styled-components';
import popupVideoImage from '../assets/popup-video-image-mockup.jpg';

const ADPreviewModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ADPreviewModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 1rem;
  width: 80vw;
  height: 70vh;
`;

const ADPreviewModalTitle = styled.span`
  font-size: 20px;
`;

const ADPreviewModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
  margin: 10px;
`;

const ADPreviewModalPopup = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
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
        <button onClick={() => setIsPreviewModal(false)}>닫기</button>
      </ADPreviewModalContainer>
    </ADPreviewModalWrapper>
  );
};

export default ADPreviewModal;
