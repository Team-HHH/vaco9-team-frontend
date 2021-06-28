import styled from 'styled-components';

export const HomeMain = {};

HomeMain.HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100%;
  font-family: 'Nanum Barun Gothic';
`;

HomeMain.HomeSection = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
`;

HomeMain.ContentWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;

HomeMain.Content = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.height || '50%'};
  margin: auto;
`;

HomeMain.Title = styled.h2`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 4rem;
  margin-bottom: 10px;
`;

HomeMain.SubTitle = styled.span`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 2rem;
  margin-bottom: 30px;
`;

HomeMain.ImgContainer = styled.div`
  display: flex;
  width: 70%;
  height: 70%;
  margin: 10% 90% 0 0;
`;

HomeMain.Button = styled.button`
  width: 200px;
  height: 50px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

HomeMain.ButtonText = styled.span`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 1rem;
`;
