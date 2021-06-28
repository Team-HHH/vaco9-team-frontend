import styled from 'styled-components';

export const SplitLayout = {};

SplitLayout.SplitLayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-height: 100vh;
`;

SplitLayout.LeftSection = styled.div`
  width: 385px;
  height: auto;
  order: 1;
  background-color: white;
`;

SplitLayout.RightSection = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw - 385px);
  height: auto;
  order: 2;
  background-color: ${props => props.theme.SUB};
`;

SplitLayout.LogoWrapper = styled.div`
  margin-top: 8%;
  text-align: center;
`;

SplitLayout.Logo = styled.img`
  width: 500px;
  padding: 3px;
`;

SplitLayout.Slogan = styled.p`
  font-family: 'Nanum Barun Gothic Bold';
  font-size: 40px;
  color: white;
  margin: 0;
`;
