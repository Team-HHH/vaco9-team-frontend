import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { format, parseISO, startOfDay, isEqual } from 'date-fns';
import {
  ResponsiveContainer,
  BarChart,
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
  padding: 40px;
  background-color: #FAF8EF;
  font-family: 'Nanum Barun Gothic';
  overflow-y: hidden;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  // grid-template-columns: repeat(6, 1fr);
   grid-template-columns: repeat(9, 1fr);
  margin: 20px 0;
  gap: 20px;

  box-sizing: border-box;
`;

const StaticOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 140px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Overview = styled(StaticOverview)`
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: ${props => props.theme.SUB};
  }
`;

const Key = styled.p`
  font-size: 21px;
  text-align: ${props => props.textAlign || 'left'};
  padding: 0;
  text-align: center;
  margin: 0;
`;

const Value = styled.p`
  font-size: 14px;
  text-align: center;
  padding: 0;
  margin: 0;
`;

const CompareValue = styled(Value)`
  font-size: 17px;
  color: ${props => props.color && props.color[0] === '-' ? 'blue' : 'red'};
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

const typeConfigs = {
  'reach': {
    color: '#e74c3c',
  },
  'click': {
    color: '#e67e22',
  },
  'cpm': {
    color: '#1406d1',
  },
  'ctr': {
    color: '#27ae60',
  },
  'cpc': {
    color: '#00adb5',
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
      cpm: (dailyStats.usedBudget * 1000 / dailyStats.reach),
      ctr: (dailyStats.click / dailyStats.reach).toFixed(2),
      cpc: (dailyStats.usedBudget / dailyStats.click).toFixed(2),
    };
  });
  const overviewData = getOverviewData(campaign, todayIndex);

  useEffect(() => {
    setType('all');
  }, [campaign]);

  function handleOverviewClick(event) {
    setType(event.target.closest('div').id);
  }

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
          <CompareValue color={overviewData?.reachNetChange}>{overviewData?.reachNetChange}</CompareValue>
        </Overview>
        <Overview
          id="click"
          onClick={handleOverviewClick}
        >
          <Key>클릭수</Key>
          <Value>{overviewData?.click}</Value>
          <CompareValue color={overviewData?.clickNetChange}>{overviewData?.clickNetChange}</CompareValue>
        </Overview>
        <Overview
          id="cpm"
          onClick={handleOverviewClick}
        >
          <Key>CPM</Key>
          <Value>{overviewData?.cpm}원</Value>
          <CompareValue color={overviewData?.ctrNetChange}>{overviewData?.ctrNetChange}</CompareValue>
        </Overview>
        <Overview
          id="ctr"
          onClick={handleOverviewClick}
        >
          <Key>CTR</Key>
          <Value>{overviewData?.ctr}</Value>
          <CompareValue color={overviewData?.ctrNetChange}>{overviewData?.ctrNetChange}</CompareValue>
        </Overview>
        <Overview
          id="cpc"
          onClick={handleOverviewClick}
        >
          <Key>CPC</Key>
          <Value>{overviewData?.cpc}원</Value>
          <CompareValue color={overviewData?.cpcNetChange}>{overviewData?.cpcNetChange}</CompareValue>
        </Overview>
        <Overview
          id="cpc"
          onClick={handleOverviewClick}
        >
          <Key>인구 통계</Key>
          <Value>{overviewData?.cpc}원</Value>
          <CompareValue color={overviewData?.cpcNetChange}>{overviewData?.cpcNetChange}</CompareValue>
        </Overview> <Overview
          id="cpc"
          onClick={handleOverviewClick}
        >
          <Key>국가별</Key>
          <Value>{overviewData?.cpc}원</Value>
          <CompareValue color={overviewData?.cpcNetChange}>{overviewData?.cpcNetChange}</CompareValue>
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          <Key textAlign="center">예산 잔액</Key>
          <Value>{campaign?.remainingBudget.toLocaleString()}원</Value>
        </Overview>
        <StaticOverview>
          <Key textAlign="center">일일 지출 한도</Key>
          <Value>{campaign?.dailyBudget.toLocaleString()}원</Value>
        </StaticOverview>
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
  if (campaign.stats.length === 0) return null;

  return {
    reach: campaign?.stats[todayIndex].reach.toLocaleString(),
    reachNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2).toLocaleString() + '%',
    click: campaign?.stats[todayIndex].click.toLocaleString(),
    clickNetChange: ((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex].click * 100).toFixed(2).toLocaleString() + '%',

    cpm: ((campaign?.dailyBudget - campaign?.remainingBudget) * 1000 / campaign?.stats[todayIndex].reach).toFixed(1).toLocaleString(),
    cpmNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2).toLocaleString() + '%',

    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2).toLocaleString() + '%',
    ctrNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2).toLocaleString() + '%',
    cpc: ((campaign?.dailyBudget - campaign?.remainingBudget) / campaign?.stats[todayIndex].click).toFixed(1).toLocaleString(),
    cpcNetChange: ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex].reach * 100).toFixed(2).toLocaleString() + '%',
  };
}

const byAge = {};
const byGender = {};
const byCountry = {};

let byAgeData;
let byGenderData;
let byCountryData;

function joinDataToObject(array, key) {
  for (let i = 0; i < array.length; i++) {
    const { age, gender, country } = array[i];

    if (byAge[age]) {
      byAge[age][key]++;
    } else {
      byAge[age] = {};
      byAge[age][key] = 1;
    }

    if (byCountry[country]) {
      byCountry[country][key]++;
    } else {
      byCountry[country] = {};
      byCountry[country][key] = 1;
    }

    if (byGender[gender]) {
      byGender[gender][key]++;
    } else {
      byGender[gender] = {};
      byGender[gender][key] = 1;
    }
  }
}

function ObjectToArray(object, byKey) {
  let result = [];
  for (const key in object) {
    const tmp = {};
    tmp[byKey] = key;
    tmp.click = object[key].click;
    tmp.reach = object[key].reach;

    result.push(tmp);
  }

  return result;
}

function processStats(reach, click) {
  joinDataToObject(reach, 'reach');
  joinDataToObject(click, 'click');

  byAgeData = ObjectToArray(byAge, 'age');
  byGenderData = ObjectToArray(byCountry, 'country');
  byCountryData = ObjectToArray(byGender, 'gender');
}

