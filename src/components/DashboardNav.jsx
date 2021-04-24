import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { color } from '../css/color';
import { useDispatch } from 'react-redux';
import mainImg from '../assets/mainImg.png';
import { selectCampaign } from '../reducers/selectedCampaign';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #EFEFEF;
`;

const NavLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
`;

const NavProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const NavProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40%;
  background-color: white;
  border-radius: 5px;
`;

const NavIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const NavUserInfos = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavUserInfoItem = styled.span`
  font-size: 15px;
`;

const NavLogo = styled.img`
  width: 100px;
  height: 100px;
`;

const NavCampaignContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 65%;
`;

const NavCampaigns = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: auto;
`;

const NavCampaignItem = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 15px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  &:focus {
    background-color: ${color.OUTLINE}
  }
`;

export default function DashboardNav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.info);
  const { allIds, byId } = useSelector(state => state.campaigns);

  function handleNavItemOnClick(event) {
    dispatch(selectCampaign(event.target.id));
  }

  return (
    <NavWrapper>
      <NavLogoContainer>
        <Link to="/">
          <NavLogo src={mainImg} />
        </Link>
      </NavLogoContainer>
      <NavProfileContainer>
        <NavProfile>
          <NavIconContainer>
            <FaRegUserCircle size={50} />
          </NavIconContainer>
          <NavUserInfos>
            <NavUserInfoItem>{user.name}</NavUserInfoItem>
            <NavUserInfoItem>{user.email}</NavUserInfoItem>
          </NavUserInfos>
        </NavProfile>
      </NavProfileContainer>
      <NavCampaignContainer>
        <NavCampaigns>
          {allIds && allIds.map((id) => (
            <NavCampaignItem
              key={byId[id]._id}
              id={byId[id]._id}
              onClick={handleNavItemOnClick}
            >
              {byId[id].title}
            </NavCampaignItem>
          ))}
        </NavCampaigns>
      </NavCampaignContainer>
    </NavWrapper>
  );
}
