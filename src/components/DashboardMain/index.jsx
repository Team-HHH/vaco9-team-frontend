import React, { useState, useEffect } from 'react';
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

import { fetchPaymentResult } from '../../apis/payment';
import { errorOccured } from '../../reducers/error';
import GeoChart from '../GeoChart';
import data from '../../json/GeoChart.world.geo.json';
import noData from '../../assets/no-data.png';
import { DashboardMain as S } from './styles';

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

const options = [
  { value: 'reach', label: '도달' },
  { value: 'click', label: '클릭' }
]

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
      ctr: (dailyStats.click / dailyStats.reach).toFixed(4),
      cpc: (dailyStats.usedBudget / dailyStats.click).toFixed(2),
    };
  });
  const overviewData = getOverviewData(campaign, todayIndex);
  const countryData = {};
  const demographicData = {};
  const countryNames = campaign?.country;
  const [property, setProperty] = useState('reach');
  let rankBy = [];
  const properties = {
    reach: '도달수',
    click: '클릭수'
  };

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

  function countrySortedBy() {
    const arr = [];
    for (let key in countryData) {
      const tmp = {
        country: key,
        reach: countryData[key].reach,
        click: countryData[key].click,
      };

      arr.push(tmp);
    }

    arr.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });

    return arr.map(el => el.country);
  }

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
    <S.Container>
      <S.DateWrapper>
        <S.DateItem>
          <S.DateText>{format(today, 'yyyy년 M월 d일 (eee)')}</S.DateText>
        </S.DateItem>
        <S.CampaignStatus status={campaign?.status}>{campaign?.status === 'opened' ? '진행중' : campaign?.status === 'pending' ? '결제대기' : '기간종료'}</S.CampaignStatus>
        {campaign?.status === 'pending' && (
          <S.DateItem>
            <S.Button
              onClick={handleRequestPaymentButtonClick}
            >
              결제하기
            </S.Button>
          </S.DateItem>
        )}
      </S.DateWrapper>
      <S.TargetWrapper>
        <S.TargetItem>
          <S.TargetText>~{campaign?.expiresAt && format(parseISO(campaign?.expiresAt), 'yyyy년 M월 d일')}</S.TargetText>
        </S.TargetItem>
        <S.TargetItem>
          <S.TargetText>{`연령 : ${campaign?.minAge}세 ~ ${campaign?.maxAge}세`}</S.TargetText>
        </S.TargetItem>
        <S.TargetItem>
          <S.TargetText></S.TargetText>
          <S.TargetText>{campaign?.gender === 'both' ? `성별 : 무관` : campaign?.gender === 'male' ? `성별 : 남성` : `성별 : 여성`}</S.TargetText>
        </S.TargetItem>
        <S.TargetItem>

          <S.Dropdown>
            <span>선택 국가</span>
            <S.DropdownContent>
              {countryNames?.map(name => {
                return (<p key={name}>{name}</p>);
              })}
            </S.DropdownContent>
          </S.Dropdown>
        </S.TargetItem>
      </S.TargetWrapper>
      <S.OverviewContainer>
        <S.Overview
          id="reach"
          onClick={handleOverviewClick}
        >
          <S.Key>도달수</S.Key>
          <S.Value>{overviewData?.reach}</S.Value>
          <S.CompareValue color={overviewData?.reachNetChange}>{overviewData?.reachNetChange}</S.CompareValue>
        </S.Overview>
        <S.Overview
          id="click"
          onClick={handleOverviewClick}
        >
          <S.Key>클릭수</S.Key>
          <S.Value>{overviewData?.click}</S.Value>
          <S.CompareValue color={overviewData?.clickNetChange}>{overviewData?.clickNetChange}</S.CompareValue>
        </S.Overview>
        <S.Overview
          id="cpm"
          onClick={handleOverviewClick}
        >
          <S.Key>CPM</S.Key>
          <S.Value>{overviewData?.cpm}</S.Value>
          <S.CompareValue color={overviewData?.cpmNetChange}>{overviewData?.cpmNetChange}</S.CompareValue>
        </S.Overview>
        <S.Overview
          id="ctr"
          onClick={handleOverviewClick}
        >
          <S.Key>CTR</S.Key>
          <S.Value>{overviewData?.ctr}</S.Value>
          <S.CompareValue color={overviewData?.ctrNetChange}>{overviewData?.ctrNetChange}</S.CompareValue>
        </S.Overview>
        <S.Overview
          id="cpc"
          onClick={handleOverviewClick}
        >
          <S.Key>CPC</S.Key>
          <S.Value>{overviewData?.cpc}</S.Value>
          <S.CompareValue color={overviewData?.cpcNetChange}>{overviewData?.cpcNetChange}</S.CompareValue>
        </S.Overview>
        <S.Overview
          id="bio"
          onClick={handleOverviewClick}
        >
          <S.Key>인구 통계</S.Key>
        </S.Overview>
        <S.Overview
          id="country"
          onClick={handleOverviewClick}
        >
          <S.Key>국가별</S.Key>
        </S.Overview>
        <S.Overview
          id="all"
          onClick={handleOverviewClick}
        >
          <S.Key textAlign="center">예산 잔액</S.Key>
          <S.Value>{Math.floor(campaign?.remainingBudget).toLocaleString()}원</S.Value>
        </S.Overview>
        <S.StaticOverview>
          <S.Key textAlign="center">일일 지출 한도</S.Key>
          <S.Value>{campaign?.dailyBudget.toLocaleString()}원</S.Value>
        </S.StaticOverview>
      </S.OverviewContainer>
      <S.ChartContainer>
        {marketingChartData?.length === 0 &&
          <S.WarningContainer>
            <img src={noData} alt="" width="300px" height="280px" />
            <S.Warning fontSize="60px">데이터가 존재하지 않습니다.</S.Warning>

          </S.WarningContainer>
        }
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
              <YAxis yAxisId={1} type="number" domain={type === 'ctr' ? [0.005, 0.015] : ['dataMin', 'dataMax']} />
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
              <YAxis yAxisId="left" orientation="left" stroke="#000000" domain={['dataMin', 'dataMax']} tickFormatter={tick => {
                if (tick > 1000000000) {
                  return Math.round(tick / 100000000) / 10 + 'Bn';
                } else if (tick > 1000000) {
                  return Math.round(tick / 100000) / 10 + 'M';
                } else {
                  return Math.round(tick / 100) / 10 + 'K';
                }
              }} />
              <YAxis yAxisId="right" orientation="right" stroke="#000000" domain={['dataMin', 'dataMax']} tickFormatter={tick => {
                if (tick > 1000000000) {
                  return Math.round(tick / 100000000) / 10 + 'Bn';
                } else if (tick > 1000000) {
                  return Math.round(tick / 100000) / 10 + 'M';
                } else {
                  return Math.round(tick / 100) / 10 + 'K';
                }
              }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="reach" fill="#ffab73" />
              <Bar yAxisId="right" dataKey="click" fill="#8ac4d0" />
            </BarChart>
          </ResponsiveContainer>
        )) || ((type === 'country') && (
          <S.GeoWrapper>
            <S.GeoContainer width="65%">
              <GeoChart targetCountries={countryData} data={data} property={property} />
            </S.GeoContainer>
            <S.GeoContainer width="35%">
              <S.SelectorWrapper>
                <S.Selector
                  value={property}
                  onChange={event => setProperty(event.target.value)}
                >
                  <option value="reach">Reach</option>
                  <option value="click">Click</option>
                </S.Selector>
              </S.SelectorWrapper>
              <S.RankTitle>{properties[property]}</S.RankTitle>
              <ol>
                {countrySortedBy().map((el, index) => {
                  return (
                    <S.RankWrapper
                      key={el}
                      backgroundColor={index % 2 ? 'white' : 'beige'}
                    >
                      <S.Rank>{el}</S.Rank>
                      <S.Rank>{(countryData[el][property]).toLocaleString()}명</S.Rank>
                    </S.RankWrapper>
                  );
                })}
              </ol>
            </S.GeoContainer>
          </S.GeoWrapper>
        ))
        }
      </S.ChartContainer>
    </S.Container>
  );
}

function getOverviewData(campaign, todayIndex) {
  if (campaign === undefined) return null;
  if (campaign.stats.length === 0) return null;
  if (!campaign?.stats[todayIndex]) return null;

  return {
    reach: campaign?.stats[todayIndex].reach.toLocaleString() + '회',
    reachNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].reach) / campaign?.stats[todayIndex - 1].reach * 100).toFixed(2).toLocaleString() + '%',
    click: campaign?.stats[todayIndex].click.toLocaleString() + '회',
    clickNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].click - campaign?.stats[todayIndex - 1].click) / campaign?.stats[todayIndex - 1].click * 100).toFixed(2).toLocaleString() + '%',

    cpm: (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000).toFixed(2).toLocaleString() + '원',
    cpmNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].reach * 1000 - campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].reach * 1000)).toFixed(2).toLocaleString() + '%',

    ctr: ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach) * 100).toFixed(2).toLocaleString() + '%',
    ctrNetChange: !campaign?.stats[todayIndex - 1] ? '' : ((campaign?.stats[todayIndex].click / campaign?.stats[todayIndex].reach - campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) / (campaign?.stats[todayIndex - 1].click / campaign?.stats[todayIndex - 1].reach) * 100).toFixed(2).toLocaleString() + '%',
    cpc: campaign?.stats[todayIndex].click !== 0 ? (campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click).toFixed(0).toLocaleString() + '원' : '데이터가 없습니다',
    cpcNetChange: !campaign?.stats[todayIndex - 1] ? '' : (((campaign?.stats[todayIndex].usedBudget / campaign?.stats[todayIndex].click) - (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)) / (campaign?.stats[todayIndex - 1].usedBudget / campaign?.stats[todayIndex - 1].click)).toFixed(2).toLocaleString() + '%',
  };
}
