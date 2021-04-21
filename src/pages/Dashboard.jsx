import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getCampaigns } from '../reducers/campaign';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const NavContainer = styled.div`
  width: 30%;
  height: 100%;
`;

const MainContainer = styled.div`
width: 70%;
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
        main
      </MainContainer>
    </Container>
  );
}
