import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DownloadHome = {};

DownloadHome.Container = styled.div`
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  font-family: 'Nanum Barun Gothic';
`;

DownloadHome.Header = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  min-width: 900px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.8);
`;

DownloadHome.LeftSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

DownloadHome.RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
  margin: auto 10%;
`;

DownloadHome.HeaderItemWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin: auto 30px;
`;

DownloadHome.HeaderItem = styled.div`
  margin: auto;
  cursor: pointer;
  font-size: ${props => props.fontSize || '20px'};
`;

DownloadHome.HeaderLink = styled(Link)`
display: flex;
height: fit-content;
margin: auto;
justify-content: center;
align-content: center;
text-decoration: none;
color: inherit;
transition: 0.3s;
  &: hover {
    color: #4D543B;
  }
`;

DownloadHome.HomeSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 160px;
height: 100vh;
`;

DownloadHome.Title = styled.h1`
margin: 0;
`;

DownloadHome.SubTitle = styled.span`
margin: 24px;
`;

DownloadHome.DownloadLink = styled.a`
cursor: pointer;
text-align: center;
text-decoration: none;
color: inherit;
font-size: 18px;
font-weight: 500;
border-radius: 4px;
border: none;
min-width: 150px;
padding: 20px 40px;
margin: 20px 0 40px 0;
background-color: #d2d6ae;
transition: transform 0.3s ease;
  &: hover {
    background-color: #ced1b8;
    transform: scale(1.03);
  }
`;

DownloadHome.Image = styled.img`
width: ${ props => props.width || '840px'};
height: ${ props => props.height || '500px'};
`;

DownloadHome.Feature = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: ${ props => props.margin};
`;

DownloadHome.FeatureWrapper = styled.div`
position: relative;
left: 80px;
display: flex;
justify-content: center;
align-items: space-evenly;
width: 60vw;
margin: 40px;
`;

DownloadHome.ParagraphWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 60px;
`;

DownloadHome.Paragraph = styled.p`
width: 40vw;
line-height: 30px;
`;

DownloadHome.Logo = styled.img`
width: 240px;
height: 80px;
margin: 20px 0 60px 0;
`;
