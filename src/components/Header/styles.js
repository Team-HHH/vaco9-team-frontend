import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header = {};

Header.Container = styled.div`
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  width: 100%;
  min-width: 900px;
  background-color: ${props => props.theme.SUB};
  font-family: 'Nanum Barun Gothic';
  font-size: 18px;
`;

Header.LeftHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  height: 100%;
`;

Header.RightHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
`;

Header.HeaderItem = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  margin: auto 30px;
`;

Header.HeaderLink = styled(Link)`
  display: flex;
  height: fit-content;
  margin: auto;
  justify-content: center;
  align-content: center;
  text-decoration: none;
  color: ${props => props.theme.MAIN_FONT};
  &:hover {
    color: ${props => props.theme.BOLD};
  }
`;
