import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import mainImg from '../assets/mainImg.png';

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
  background-color: rgb(255, 249, 219, 0.3);
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
  height: 80%;
  border: 1px solid black;
`;

const NavIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const NavUserInfos = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavUserInfoItem = styled.span`
  font-size: 17px;
  margin: 5px;
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
  margin-top: 30px;
  border: 1px solid black;
`;

const NavCampaignItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px;
  padding: 10px;
  font-size: 17px;
`;

export default function DashboardNav() {
  const { user } = useSelector((state) => ({
    user: state.loginReducer.user,
  }), shallowEqual);

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
            <FaRegUserCircle size={70} />
          </NavIconContainer>
          <NavUserInfos>
            <NavUserInfoItem>{user.name}</NavUserInfoItem>
            <NavUserInfoItem>{user.email}</NavUserInfoItem>
          </NavUserInfos>
        </NavProfile>
      </NavProfileContainer>
      <NavCampaignContainer>
        <NavCampaigns>
          {adsTitles.map((title, index) => (
            <NavCampaignItem key={index}>{title}</NavCampaignItem>
          ))}
        </NavCampaigns>
      </NavCampaignContainer>
    </NavWrapper>
  );
}
