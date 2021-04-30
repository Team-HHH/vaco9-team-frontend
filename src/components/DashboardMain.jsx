import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO, startOfDay, isEqual, differenceInCalendarDays } from 'date-fns';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  AreaChart,
  Brush,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import ReactTooltip from 'react-tooltip';

import MapChart from './MapChart';
import { fetchPaymentResult } from '../apis/payment';
import { errorOccured } from '../reducers/error';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #FAF8EF;
  font-family: 'Nanum Barun Gothic';
  overflow-y: hidden;
`;

const DateWrapper = styled.div`
  margin-bottom: 10px
`;

const DateText = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;

const CampaignStatus = styled.div`
  display: inline-flex;
  justify-content: center;
  width: fit-content;
  background-color: ${props => props.status === 'opened' ? '#2eb872' : props.status === 'pending' ? '#fa4659' : '#687980'};
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 20%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  margin: 20px 0;
  gap: 20px;
  box-sizing: border-box;
`;

const StaticOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
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

const MapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TargetWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 7%;
`;

const TargetItem = styled.div`
  display: flex;
  height: 100%;
`;

const TargetText = styled.span`
  margin: auto;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  font-size: 16px;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const typeConfigs = {
  'reach': {
    color: '#e74c3c',
  },
  'click': {
    color: '#e67e22',
  },
  'cpm': {
    color: '#e69c3c',
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
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const selectedCampaign = useSelector(state => state.selectedCampaign);
  const campaign = useSelector(state => state.campaigns.byId?.[selectedCampaign]);
  const today = startOfDay(new Date());
  const todayIndex = campaign?.stats.findIndex(stats => isEqual(parseISO(stats.date), today));
  const marketingChartData = campaign?.stats.map(dailyStats => {
    return {
      ...dailyStats,
      date: dailyStats.date.slice(0, 10),
      cpm: (dailyStats.usedBudget / dailyStats.reach * 1000).toFixed(2),
      ctr: (dailyStats.click / dailyStats.reach).toFixed(2),
      cpc: (dailyStats.usedBudget / dailyStats.click).toFixed(2),
    };
  });
  const overviewData = getOverviewData(campaign, todayIndex);
  const countryData = {};
  const demographicData = {};

  campaign?.exposed.forEach(elem => {
    if (!demographicData[elem.age]) {
      demographicData[elem.age] = { age: elem.age, reach: 0, click: 0 };
    }
    if (!countryData[elem.country]) {
      countryData[elem.country] = { reach: 0, click: 0 };
    }

    demographicData[elem.age].reach += elem.reach;
    demographicData[elem.age].click += elem.click;
    countryData[elem.country].reach += elem.reach;
    countryData[elem.country].click += elem.click;
  });

  useEffect(() => {
    setType('all');
  }, [campaign]);

  function handleOverviewClick(event) {
    setType(event.target.closest('div').id);
  }

  async function handleRequestPaymentButtonClick() {
    const IMP = window.IMP;
    IMP.init(process.env.REACT_APP_IMPORT_ID);

    const campaignDuration = differenceInCalendarDays(parseISO(campaign?.expiresAt), new Date());

    try {
      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: campaign?._id,
        name: campaign?.title,
        amount: campaign?.dailyBudget * campaignDuration,
        buyer_email: user.email,
        buyer_name: user.name,
      }, async (rsp) => {
        if (rsp.success) {
          const { imp_uid, merchant_uid } = rsp;
          const response = await fetchPaymentResult({ imp_uid, merchant_uid });

          if (!response.ok) {
            dispatch(errorOccured('결제에 실패했습니다.'));
            return;
          }

          dispatch(errorOccured('결제가 완료되었습니다.', 'reload'));
        } else {
          dispatch(errorOccured('결제에 실패했습니다.'));
          return;
        }
      });
    } catch (err) {
      dispatch(errorOccured('캠페인 생성에 실패했습니다.'));
    }
  }

  return (
    <Container>
      <DateWrapper>
        <DateText>{format(today, 'yyyy년 M월 d일 (eee)')}</DateText>
        <CampaignStatus status={campaign?.status}>{campaign?.status === 'opened' ? '진행중' : campaign?.status === 'pending' ? '결제대기' : '기간종료'}</CampaignStatus>
        {campaign?.status === 'pending' && (
          <Button
            onClick={handleRequestPaymentButtonClick}
          >
            결제하기
          </Button>
        )}
      </DateWrapper>
      <TargetWrapper>
        <TargetItem>
          <TargetText>~{campaign?.expiresAt && format(parseISO(campaign?.expiresAt), 'yyyy년 M월 d일')}</TargetText>
        </TargetItem>
        <TargetItem>
          <TargetText>연령:</TargetText>
          <TargetText>{`${campaign?.minAge} ~ ${campaign?.maxAge}`}</TargetText>
        </TargetItem>
        <TargetItem>
          <TargetText>성별:</TargetText>
          <TargetText>{campaign?.gender === 'both' ? '무관' : campaign?.gender === 'male' ? '남성' : '여성'}</TargetText>
        </TargetItem>
        <TargetItem>
          <TargetText>국가:</TargetText>
          <TargetText>{campaign?.country}</TargetText>
        </TargetItem>
      </TargetWrapper>
      <OverviewContainer>
        <Overview
          id="reach"
          onClick={handleOverviewClick}
        >
          <Key>도달수</Key>
          <Value>{overviewData?.reach}회</Value>
          <CompareValue color={overviewData?.reachNetChange}>{overviewData?.reachNetChange}</CompareValue>
        </Overview>
        <Overview
          id="click"
          onClick={handleOverviewClick}
        >
          <Key>클릭수</Key>
          <Value>{overviewData?.click}회</Value>
          <CompareValue color={overviewData?.clickNetChange}>{overviewData?.clickNetChange}</CompareValue>
        </Overview>
        <Overview
          id="cpm"
          onClick={handleOverviewClick}
        >
          <Key>CPM</Key>
          <Value>{overviewData?.cpm}원</Value>
          <CompareValue color={overviewData?.cpmNetChange}>{overviewData?.cpmNetChange}</CompareValue>
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
          id="bio"
          onClick={handleOverviewClick}
        >
          <Key>인구 통계</Key>
        </Overview> <Overview
          id="country"
          onClick={handleOverviewClick}
        >
          <Key>국가별</Key>
        </Overview>
        <Overview
          id="all"
          onClick={handleOverviewClick}
        >
          <Key textAlign="center">예산 잔액</Key>
          <Value>{Math.floor(campaign?.remainingBudget).toLocaleString()}원</Value>
        </Overview>
        <StaticOverview>
          <Key textAlign="center">일일 지출 한도</Key>
          <Value>{campaign?.dailyBudget.toLocaleString()}원</Value>
        </StaticOverview>
      </OverviewContainer>
      <ChartContainer>
        {marketingChartData?.length > 0 && (type === 'all' && (
          <ResponsiveContainer>
            <AreaChart data={marketingChartData}>
              <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
              <YAxis yAxisId={1} domain={['dataMin', 'dataMax']} />
              <Tooltip />
              <Area type='natural' dataKey='reach' stackId="1" stroke={typeConfigs['reach'].color} fill={typeConfigs['reach'].color} yAxisId={1} />
              <Area type='natural' dataKey='click' stackId="2" stroke={typeConfigs['click'].color} fill={typeConfigs['click'].color} yAxisId={1} />
              <Brush dataKey="date" startIndex={Math.round(marketingChartData?.length * 0.45)} stroke={'#363636'} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        )) || ((type === 'reach' || type === 'click' || type === 'cpm' || type === 'ctr' || type === 'cpc') && (
          <ResponsiveContainer>
            <AreaChart data={marketingChartData}>
              <XAxis dataKey="date" tickCount={10} tick={CustomizedAxisTick} minTickGap={2} tickSize={7} dx={14} allowDataOverflow={true} />
              <YAxis yAxisId={1} type="number" domain={type === 'ctr' ? [0, 1] : ['dataMin', 'dataMax']} />
              <Tooltip />
              <Area type='natural' dataKey={type} stackId="1" stroke={typeConfigs[type].color} fill={typeConfigs[type].color} yAxisId={1} />
              <Brush dataKey="date" startIndex={Math.round(marketingChartData?.length * 0.45)} stroke={'#363636'} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        )) || ((type === 'bio') && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={Object.values(demographicData)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="reach" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="click" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )) || ((type === 'country') && (
          <MapWrapper>
            <MapChart setTooltipContent={setContent} data={countryData}/>
            <ReactTooltip>{content}</ReactTooltip>
          </MapWrapper>
        ))
        }
      </ChartContainer>
    </Container>
  );
}

function getOverviewData(campaign, todayIndex) {
  if (campaign === undefined) return null;
  if (campaign.stats.length === 0) return null;
  if (!campaign?.stats[todayIndex]) return null;

  return {
    reach: campaign?.stats[todayIndex].reach.toLocaleString(),
    reachNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex - 1].reach * 100).toFixed(2).toLocaleString() + '%',
    click: campaign?.stats[todayIndex].click.toLocaleString(),
    clickNetChange: !campaign?.stats[todayIndex - 1] ? '' :  ((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex - 1].click * 100).toFixed(2).toLocaleString() + '%',

    cpm: (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000).toFixed(2).toLocaleString(),
    cpmNetChange: !campaign?.stats[todayIndex - 1] ? '' :  ((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000 - campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000)).toFixed(2).toLocaleString() + '%',

    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2).toLocaleString() + '%',
    ctrNetChange: !campaign?.stats[todayIndex - 1] ? '' :  ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) / (campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) * 100).toFixed(2).toLocaleString() + '%',
    cpc: (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click).toFixed(0).toLocaleString(),
    cpcNetChange: !campaign?.stats[todayIndex - 1] ? '' :  (((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click) - (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)).toFixed(2).toLocaleString() + '%',
  };
}
