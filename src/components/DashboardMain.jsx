import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format, parseISO, endOfDay, startOfDay, isEqual } from 'date-fns';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const DateContainer = styled.div`
  width: 100%;
  height: 5%;
  padding: 30px;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 20%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 30px;
  gap: 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
  padding: 30px;
`;

const Overview = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

export default function DashboardMain() {
  const today = startOfDay(new Date());
  const selectedCampaign = useSelector(state => state.selectedCampaign);
  const campaign = useSelector(state => state.campaigns.byId?.[selectedCampaign]);
  const todayStats = campaign?.stats.find(stats => isEqual(parseISO(stats.date), today));

  return (
    <Container>
      <DateContainer>
        {format(today, 'yyyy년 M월 d일 (eee)')}
      </DateContainer>
      <OverviewContainer>
        <Overview>도달수 : {todayStats?.reach}</Overview>
        <Overview>클릭수 : {todayStats?.click}</Overview>
        <Overview>전환률 : {todayStats?.click / todayStats?.reach}</Overview>
        <Overview>예산 잔액 : {campaign?.remainingBudget}</Overview>
        <Overview>CPC : {(campaign?.dailyBudget - campaign?.remainingBudget) / todayStats?.click}</Overview>
        <Overview>일일 지출 한도 : {campaign?.dailyBudget}</Overview>
      </OverviewContainer>
      <ChartContainer>
        <Overview>차트 1</Overview>
        <Overview>차트 2</Overview>
        <Overview>차트 3</Overview>
        <Overview>차트 4</Overview>
        <Overview>차트 5</Overview>
        <Overview>차트 6</Overview>
      </ChartContainer>
    </Container>
  );
}
