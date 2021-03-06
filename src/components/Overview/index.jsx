import React from 'react';
import { Overview as S } from './styles';
import {
  mapOverviewTypesToString,
  overviewTypes as Types
} from '../../constants/overviewTypes';

export default function Overview(props) {
  const {
    overviewData,
    setType,
    campaign
  } = props;
  const {
    reach,
    click,
    cpm,
    ctr,
    cpc,
    bio,
    country,
    remainingBudget,
    dailyBudget
  } = mapOverviewTypesToString;

  function handleOverviewClick(event) {
    setType(event.target.closest('div').id);
  }

  return (
    <S.OverviewContainer>
      <S.Overview
        id={Types.reach}
        onClick={handleOverviewClick}
      >
        <S.Key>{reach}</S.Key>
        <S.Value>{overviewData?.reach}</S.Value>
        <S.CompareValue color={overviewData?.reachNetChange}>
          {overviewData?.reachNetChange}
        </S.CompareValue>
      </S.Overview>
      <S.Overview
        id={Types.click}
        onClick={handleOverviewClick}
      >
        <S.Key>{click}</S.Key>
        <S.Value>{overviewData?.click}</S.Value>
        <S.CompareValue color={overviewData?.clickNetChange}>
          {overviewData?.clickNetChange}
        </S.CompareValue>
      </S.Overview>
      <S.Overview
        id={Types.cpm}
        onClick={handleOverviewClick}
      >
        <S.Key>{cpm}</S.Key>
        <S.Value>{overviewData?.cpm}</S.Value>
        <S.CompareValue color={overviewData?.cpmNetChange}>
          {overviewData?.cpmNetChange}
        </S.CompareValue>
      </S.Overview>
      <S.Overview
        id={Types.ctr}
        onClick={handleOverviewClick}
      >
        <S.Key>{ctr}</S.Key>
        <S.Value>{overviewData?.ctr}</S.Value>
        <S.CompareValue color={overviewData?.ctrNetChange}>
          {overviewData?.ctrNetChange}
        </S.CompareValue>
      </S.Overview>
      <S.Overview
        id={Types.cpc}
        onClick={handleOverviewClick}
      >
        <S.Key>{cpc}</S.Key>
        <S.Value>{overviewData?.cpc}</S.Value>
        <S.CompareValue color={overviewData?.cpcNetChange}>
          {overviewData?.cpcNetChange}
        </S.CompareValue>
      </S.Overview>
      <S.Overview
        id={Types.bio}
        onClick={handleOverviewClick}
      >
        <S.Key>{bio}</S.Key>
      </S.Overview>
      <S.Overview
        id={Types.country}
        onClick={handleOverviewClick}
      >
        <S.Key>{country}</S.Key>
      </S.Overview>
      <S.Overview
        id={Types.all}
        onClick={handleOverviewClick}
      >
        <S.Key textAlign="center">{remainingBudget}</S.Key>
        <S.Value>{Math.floor(campaign?.remainingBudget).toLocaleString()}???</S.Value>
      </S.Overview>
      <S.StaticOverview>
        <S.Key textAlign="center">{dailyBudget}</S.Key>
        <S.Value>{campaign?.dailyBudget.toLocaleString()}???</S.Value>
      </S.StaticOverview>
    </S.OverviewContainer>
  );
}
