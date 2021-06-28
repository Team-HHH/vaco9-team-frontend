import styled from 'styled-components';

export const Dashboard = {};

Dashboard.Container = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  box-sizing: border-box;
`;

Dashboard.NavContainer = styled.div`
  width: 15%;
  height: 100%;
  overflow-y: scroll;
`;

Dashboard.MainContainer = styled.div`
  width: 85%;
  height: 100%;
  overflow-y: hidden;
`;
