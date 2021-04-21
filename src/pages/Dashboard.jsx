import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getCampaigns } from '../reducers/campaign';
import DashboardMain from '../components/DashboardMain';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
`;

const NavContainer = styled.div`
  width: 20%;
  height: 100%;
`;

const MainContainer = styled.div`
  width: 80%;
  height: 100%;
`;

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  return (
    <Container>
      <NavContainer>
        nav
      </NavContainer>
      <MainContainer>
        <DashboardMain />
      </MainContainer>
    </Container>
  );
}
