import styled from 'styled-components';

export const ModalContent = {};

ModalContent.ModalContainer = styled.div`
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

ModalContent.ModalContentWrapper = styled.div`
  display:flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
  background-color: ${props => props.theme.WHITE};
  font-family: 'Nanum Barun Gothic Bold';
`;

ModalContent.CloseButton = styled.button`
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
