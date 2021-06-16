import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  format,
  isEqual,
  parseISO,
  startOfDay,
  differenceInCalendarDays
} from 'date-fns';
import {
  Bar,
  Area,
  Brush,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import Overview from '../Overview';
import GeoChart from '../GeoChart';
import noData from '../../assets/no-data.png';
import data from '../../json/GeoChart.world.geo.json';
import { requestPay } from '../../utils/requestPay';
import {
  typeConfigs,
  overviewTypes,
  overviewProperties as properties
} from '../../constants/overviewTypes';
import getOverviewData from '../../utils/getOverviewData';
import sortByProperty from '../../utils/sortByCountry';
import { DashboardMain as S } from './styles';

const {
  all,
  reach,
  click,
  cpm,
  ctr,
  cpc,
  bio,
  country
} = overviewTypes;

const CustomizedAxisTick = ({ x, y, payload }) => {
  const dateTip = parseISO(payload.value).toDateString();
  const formattedDate = `${dateTip.slice(4, 7)}, ${dateTip.slice(8, 10)}`;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={23}
        y={0}
        dy={14}
        fontSize="0.90em"
        fontFamily="bold"
        textAnchor="end"
        fill="#363636"
      >
        {formattedDate}
      </text>
    </g>
  );
};

export default function DashboardMain() {
  const dispatch = useDispatch();
  const [type, setType] = useState(all);
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
    setType(all);
  }, [campaign]);

  function handleRequestPaymentButtonClick() {
    requestPay({
      merchantId: campaign?._id,
      title: campaign?.title,
      dailyBudget: campaign?.dailyBudget,
      expiresAt: campaign?.expiresAt,
      userEmail: user.email,
      userName: user.name,
    }, 'reload', dispatch);
  }

  return (
    <S.Container>
      <S.DateWrapper>
        <S.DateItem>
          <S.DateText>{format(today, 'yyyy년 M월 d일 (eee)')}</S.DateText>
        </S.DateItem>
        <S.CampaignStatus status={campaign?.status}>
          {campaign?.status === 'opened' ? '진행중' : campaign?.status === 'pending' ? '결제대기' : '기간종료'}
        </S.CampaignStatus>
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
      <Overview
        overviewData={overviewData}
        setType={setType}
        campaign={campaign}
      />
      <S.ChartContainer>
        {marketingChartData?.length === 0 &&
          <S.WarningContainer>
            <img src={noData} alt="" width="300px" height="280px" />
            <S.Warning fontSize="60px">데이터가 존재하지 않습니다.</S.Warning>

          </S.WarningContainer>
        }
        {marketingChartData?.length > 0 && (type === all && (
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
        )) || ((type === reach || type === click || type === cpm || type === ctr || type === cpc) && (
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
        )) || ((type === bio) && (
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
        )) || ((type === country) && (
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
                {sortByProperty(countryData, property).map((el, index) => {
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
