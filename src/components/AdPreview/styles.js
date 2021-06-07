import styled from 'styled-components';

export const AdPreview = {};

AdPreview.Container = styled.div`
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

AdPreview.Wrapper = styled.div`
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

AdPreview.ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin: 10px;
`;

AdPreview.Popup = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

AdPreview.PopupImage = styled.img`
  width: 100%;
  height: 100%;
`;

AdPreview.Banner = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
`;

AdPreview.BannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

AdPreview.CloseButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER}
  }
`;
