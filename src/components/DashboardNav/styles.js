import styled from 'styled-components';

export const DashboardNav = {};

DashboardNav.NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.WHITE};
  font-family: 'Nanum Barun Gothic';
`;

DashboardNav.NavProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14%;
`;

DashboardNav.NavProfile = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  background-color: ${props => props.theme.WHITE};
  border-radius: 5px;
`;

DashboardNav.NavIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

DashboardNav.NavUserInfos = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

DashboardNav.NavUserInfoItem = styled.span`
  font-size: 15px;
`;

DashboardNav.NavCampaignContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 65%;
`;

DashboardNav.NavCampaigns = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
`;

DashboardNav.NavCampaignItem = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 15px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  background-color: white;
  &:hover {
    background-color: ${props => props.theme.MAIN}
  }
  &:focus {
    background-color: ${props => props.theme.SUB}
  }
`;
