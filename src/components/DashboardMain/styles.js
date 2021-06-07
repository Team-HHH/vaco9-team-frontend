import styled from 'styled-components';

export const DashboardMain = {};

DashboardMain.Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #FAF8EF;
  font-family: 'Nanum Barun Gothic';
  overflow-y: hidden;
`;

DashboardMain.DateWrapper = styled.div`
  margin-bottom: 10px;
  height: 30px;
  display: flex;
`;

DashboardMain.DateItem = styled.div`
  display: flex;
`;

DashboardMain.DateText = styled.span`
  margin: 0 10px 0 0;
  font-size: 20px;
  height: 100%;
  padding: 5px;
`;

DashboardMain.CampaignStatus = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  height: 100%;
  background-color: ${props => props.status === 'opened' ? '#2eb872' : props.status === 'pending' ? '#fa4659' : '#687980'};
  border-radius: 5px;
  padding: 5px;
  margin: 0 10px 0 0;
`;

DashboardMain.Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  font-size: 16px;
  height: 100%;
  margin: 0;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

DashboardMain.DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  background-color: #f9f9f9;
  width: 160px;
  margin-left: -58px;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 10px 12px;
  z-index: 1;
`;

DashboardMain.Dropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover ${DashboardMain.DropdownContent}{
    display: block;
  }
`;

DashboardMain.OverviewContainer = styled.div`
  width: 100%;
  height: 15%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  margin: 16px 0;
  gap: 16px;
  box-sizing: border-box;
`;

DashboardMain.StaticOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
`;

DashboardMain.Overview = styled(DashboardMain.StaticOverview)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.theme.SUB};
  }
`;

DashboardMain.Key = styled.p`
  font-size: 20px;
  text-align: ${props => props.textAlign || 'left'};
  padding: 0;
  text-align: center;
  margin: 0;
`;

DashboardMain.Value = styled.p`
  font-size: 14px;
  text-align: center;
  padding: 0;
  margin: 0;
`;

DashboardMain.CompareValue = styled(DashboardMain.Value)`
  font-size: 17px;
  color: ${props => props.color && props.color[0] === '-' ? 'blue' : 'red'};
`;

DashboardMain.ChartContainer = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  height: 70%;
  background-color: white;
  border-radius: 10px;
  align-self: center;
`;

DashboardMain.TargetWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: white;
  width: 100%;
  height: 7%;
`;

DashboardMain.TargetItem = styled.div`
  display: flex;
  height: 100%;
`;

DashboardMain.TargetText = styled.span`
  margin: auto;
`;

DashboardMain.GeoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

DashboardMain.GeoContainer = styled.div`
  width: ${props => props.width}
`;

DashboardMain.SelectorWrapper = styled.div`
  display: flex;
  place-content: flex-end;
`;

DashboardMain.Selector = styled.select`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.BACKGROUND};
  padding: 5px;
  cursor: pointer;
  outline: none;
`;

DashboardMain.RankWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  background: ${props => props.backgroundColor};
`;

DashboardMain.RankTitle = styled.h2`
  text-align: center;
`;

DashboardMain.Rank = styled.span`
  margin: 10px;
`;

DashboardMain.WarningContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

DashboardMain.Warning = styled.h1`
  font-size: 36px;
`;
