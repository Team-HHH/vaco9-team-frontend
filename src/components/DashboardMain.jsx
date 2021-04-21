import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DateContainer = styled.div`
  width: 100%;
  height: 5%;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
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
  // const selectedCampaignId = useSelector(state => state.selectedCampaignId);
  // const campaign = useSelector(state => state.campaign.byId[selectedCampaignId]);
  // const selectedCampaignId = '607fb545f9b961f3f18e5271';
  // const campaign = useSelector(state => state.campaigns.byId?.selectedCampaignId);

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
