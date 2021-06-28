import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { DashboardNav as S } from './styles';
import { selectCampaign } from '../../reducers/selectedCampaign';

export default function DashboardNav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { allIds, byId } = useSelector(state => state.campaigns);

  function handleNavItemOnClick(event) {
    dispatch(selectCampaign(event.target.id));
  }

  return (
    <S.NavWrapper>
      <S.NavProfileContainer>
        <S.NavProfile>
          <S.NavIconContainer>
            <FaRegUserCircle size={35} />
          </S.NavIconContainer>
          <S.NavUserInfos>
            <S.NavUserInfoItem>{user.name}</S.NavUserInfoItem>
            <S.NavUserInfoItem>{user.email}</S.NavUserInfoItem>
          </S.NavUserInfos>
        </S.NavProfile>
      </S.NavProfileContainer>
      <S.NavCampaignContainer>
        <S.NavCampaigns>
          {allIds && allIds.map((id) => (
            <S.NavCampaignItem
              key={byId[id]._id}
              id={byId[id]._id}
              onClick={handleNavItemOnClick}
            >
              {byId[id].title}
            </S.NavCampaignItem>
          ))}
        </S.NavCampaigns>
      </S.NavCampaignContainer>
    </S.NavWrapper>
  );
}
