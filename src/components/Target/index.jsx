import React from 'react';
import { format, parseISO } from 'date-fns';
import { genders, mapGendersToString } from '../../constants/gender';
import { mapAgeToString } from '../../constants/age';
import { Target as S } from './styles';

export default function Target({ campaign, countryNames }) {
  const {
    gender,
    male,
    female,
    both
  } = mapGendersToString;
  const {
    age,
    ageRange
  } = mapAgeToString;

  return (
    <S.TargetWrapper>
      <S.TargetItem>
        <S.TargetText>~{campaign?.expiresAt && format(parseISO(campaign?.expiresAt), 'yyyy년 M월 d일')}</S.TargetText>
      </S.TargetItem>
      <S.TargetItem>
        <S.TargetText>
          {`${ageRange} : ${campaign?.minAge}${age} ~ ${campaign?.maxAge}${age}`}
        </S.TargetText>
      </S.TargetItem>
      <S.TargetItem>
        <S.TargetText>
          {campaign?.gender === genders.both ?
            `${gender} : ${both}` : campaign?.gender === genders.male
              ? `${gender} : ${male}` : `${gender} : ${female}`}
        </S.TargetText>
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
  );
}
