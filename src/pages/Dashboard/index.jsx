import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCampaigns } from '../../reducers/campaigns';
import Header from '../../components/Header';
import DashboardMain from '../../components/DashboardMain';
import DashboardNav from '../../components/DashboardNav';
import { Dashboard as S } from './styles';

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
