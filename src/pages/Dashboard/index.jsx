import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Dashboard as S } from './styles';
import Header from '../../components/Header';
import DashboardNav from '../../components/DashboardNav';
import DashboardMain from '../../components/DashboardMain';
import { getCampaigns } from '../../reducers/campaigns';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  return (
    <>
      <Header />
      <S.Container>
        <S.NavContainer>
          <DashboardNav />
        </S.NavContainer>
        <S.MainContainer>
          <DashboardMain />
        </S.MainContainer>
      </S.Container>
    </>
  );
}
