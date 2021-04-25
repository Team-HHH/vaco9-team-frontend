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
  background-color: #FAF8EF;
  font-family: 'Nanum Barun Gothic';
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 20px 0;
  gap: 20px;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 140px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Key = styled.p`
  font-size: 12px;
  text-align: ${props => props.textAlign || 'left'}
  padding: 0;
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
`;

const Value = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 0;
  margin: 0;
`;

const ChartContainer = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  height: 70%;
  background-color: white;
  border-radius: 10px;
  align-self: center;
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
    setType(event.target.closest('div').id);
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
      <div>
        {format(today, 'yyyy년 M월 d일 (eee)')}
      </div>
      <OverviewContainer>
        <Overview
          id="reach"
          onClick={handleOverviewClick}
        >
          <Key>도달수</Key>
          <Value>{overviewData?.reach}</Value>
          <Key>전일대비</Key>
          <Value>{overviewData?.reachNetChange}</Value>
        </Overview>
        <Overview
          id="click"
          onClick={handleOverviewClick}
        >
          <Key>클릭수</Key>
          <Value>{overviewData?.click}</Value>
          <Key>전일대비</Key>
          <Value>{overviewData?.clickNetChange}</Value>
        </Overview>
        <Overview
          id="ctr"
          onClick={handleOverviewClick}
        >
          <Key>CTR</Key>
          <Value>{overviewData?.ctr}</Value>
          <Key>전일대비</Key>
          <Value>{overviewData?.ctrNetChange}</Value>
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          <Key textAlign="center">예산 잔액</Key>
          <Value>{campaign?.remainingBudget}원</Value>
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          <Key>CPC</Key>
          <Value>{overviewData?.cpc}원</Value>
          <Key>전일대비</Key>
          <Value>{overviewData?.cpcNetChange}</Value>
        </Overview>
        <Overview>
          <div>
            <Key textAlign="center">일일 지출 한도</Key>
            <Value>{campaign?.dailyBudget}</Value>
          </div>
        </Overview>
      </OverviewContainer>
      <ChartContainer>
        {chartDate?.length > 0 && type === 'all' ? (
          <ResponsiveContainer>
            <AreaChart data={chartDate}>
              <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
              <YAxis yAxisId={1} domain={['dataMin', 'dataMax']} />
              <Tooltip />
              <Area type='natural' dataKey='reach' stackId="1" stroke={typeConfigs['reach'].color} fill={typeConfigs['reach'].color} yAxisId={1} />
              <Area type='natural' dataKey='click' stackId="2" stroke={typeConfigs['click'].color} fill={typeConfigs['click'].color} yAxisId={1} />
              <Brush dataKey="date" startIndex={Math.round(chartDate?.length * 0.45)} stroke={'#363636'} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
            <ResponsiveContainer>
              <AreaChart data={chartDate}>
                <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
                <YAxis yAxisId={1} type="number" domain={type === 'ctr' ? [0, 1] : ['dataMin', 'dataMax']} />
                <Tooltip />
                <Area type='natural' dataKey={type} stackId="1" stroke={typeConfigs[type].color} fill={typeConfigs[type].color} yAxisId={1} />
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
    reachNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2) + '%',
    click: campaign?.stats[todayIndex].click,
    clickNetChange: ((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex].click * 100).toFixed(2) + '%',
    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2) + '%',
    ctrNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2) + '%',
    cpc: ((campaign?.dailyBudget - campaign?.remainingBudget) / campaign?.stats[todayIndex].click).toFixed(1),
    cpcNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2) + '%',
  };
}
