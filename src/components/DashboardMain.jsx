import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

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
  const selectedCampaign = useSelector(state => state.selectedCampaign);
  const campaign = useSelector(state => state.campaigns.byId?.[selectedCampaign]);

  return (
    <Container>
      <DateContainer>
        {format(new Date(), 'yyyy년 M월 d일 (eee)')}
      </DateContainer>
      <OverviewContainer>
        <Overview>개요 1</Overview>
        <Overview>개요 2</Overview>
        <Overview>개요 3</Overview>
        <Overview>개요 4</Overview>
        <Overview>개요 5</Overview>
        <Overview>개요 6</Overview>
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
