import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getCampaigns } from '../reducers/campaigns';
import Header from '../components/Header';
import DashboardMain from '../components/DashboardMain';
import DashboardNav from '../components/DashboardNav';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  margin-top: 80px;
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
    <>
      <Header />
      <Container>
        <NavContainer>
          <DashboardNav />
        </NavContainer>
        <MainContainer>
          <DashboardMain />
        </MainContainer>
      </Container>
    </>
  );
}
