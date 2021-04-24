import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format, parseISO, startOfDay, isEqual } from 'date-fns';
import {
  ResponsiveContainer,
  AreaChart,
  Brush,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

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

const Overview = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid black;
`;

const ChartContainer = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  height: 75%;
`;

export default function DashboardMain() {
  const [type, setType] = useState('all');
  const selectedCampaign = useSelector(state => state.selectedCampaign);
  const campaign = useSelector(state => state.campaigns.byId?.[selectedCampaign]);
  const today = startOfDay(new Date());
  const todayIndex = campaign?.stats.findIndex(stats => isEqual(parseISO(stats.date), today));
  const chartDate = campaign?.stats.map(dailyStats => {
    return {
      ...dailyStats,
      date: dailyStats.date.slice(0, 10),
      ctr: dailyStats.click / dailyStats.reach,
    };
  });
  const overviewData = getOverviewData(campaign, todayIndex);

  useEffect(() => {
    setType('all');
  }, [campaign]);

  const handleOverviewClick = (event) => {
    setType(event.target.id);
  };

  const typeConfigs = {
    'reach': {
      color: '#e74c3c',
    },
    'click': {
      color: '#e67e22',
    },
    'ctr': {
      color: '#27ae60',
    },
    'all': {
      color: '#363636',
    },
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const dateTip = parseISO(payload.value).toDateString();
    const formattedDate = `${dateTip.slice(4, 7)}, ${dateTip.slice(8, 10)}`;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
          {formattedDate}
        </text>
      </g>
    );
  };

  return (
    <Container>
      <DateContainer>
        {format(today, 'yyyy년 M월 d일 (eee)')}
      </DateContainer>
      <OverviewContainer>
        <Overview
          id="reach"
          onClick={handleOverviewClick}
        >
          도달수 : {overviewData?.reach} <br />
          전일대비 : {overviewData?.reachNetChange}
        </Overview>
        <Overview
          id="click"
          onClick={handleOverviewClick}
        >
          클릭수 : {overviewData?.click} <br />
          전일대비 : {overviewData?.clickNetChange}
        </Overview>
        <Overview
          id="ctr"
          onClick={handleOverviewClick}
        >
          CTR : {overviewData?.ctr} <br />
          전일대비 : {overviewData?.ctrNetChange}
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          예산 잔액 : {campaign?.remainingBudget}원
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          CPC : {overviewData?.cpc}원<br />
          전일대비 : {overviewData?.cpcNetChange}
        </Overview>
        <Overview>일일 지출 한도 : {campaign?.dailyBudget}</Overview>
      </OverviewContainer>
      <ChartContainer>
        {chartDate?.length > 0 && type === 'all' ? (
          <ResponsiveContainer>
            <AreaChart data={chartDate}>
              <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
              <YAxis yAxisId={1} domain={['dataMin', 'dataMax']}/>
              <Tooltip />
              <Area type='natural' dataKey='reach' stackId="1" stroke={typeConfigs['reach'].color} fill={typeConfigs['reach'].color} yAxisId={1}/>
              <Area type='natural' dataKey='click' stackId="2" stroke={typeConfigs['click'].color} fill={typeConfigs['click'].color} yAxisId={1}/>
              <Brush dataKey="date" startIndex={Math.round(chartDate?.length * 0.45)} stroke={'#363636'} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer>
            <AreaChart data={chartDate}>
              <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
              <YAxis yAxisId={1} type="number" domain={type==='ctr' ? [0, 1] :['dataMin', 'dataMax']}/>
              <Tooltip />
              <Area type='natural' dataKey={type} stackId="1" stroke={typeConfigs[type].color} fill={typeConfigs[type].color} yAxisId={1}/>
              <Brush dataKey="date" startIndex={Math.round(chartDate?.length * 0.45)} stroke={'#363636'} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </Container>
  );
}

function getOverviewData(campaign, todayIndex) {
  if (campaign === undefined) return null;

  return {
    reach: campaign?.stats[todayIndex].reach,
    reachNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2)+'%',
    click: campaign?.stats[todayIndex].click,
    clickNetChange:((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex].click * 100).toFixed(2)+'%',
    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2)+'%',
    ctrNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2)+'%',
    cpc: ((campaign?.dailyBudget - campaign?.remainingBudget) / campaign?.stats[todayIndex].click).toFixed(1),
    cpcNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2)+'%',
  };
}
