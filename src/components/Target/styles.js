import styled from 'styled-components';

export const Target = {};

Target.DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  background-color: #f9f9f9;
  width: 160px;
  margin-left: -58px;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 10px 12px;
  z-index: 1;
`;

Target.Dropdown = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover ${Target.DropdownContent}{
    display: block;
  }
`;

Target.TargetWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  background-color: white;
  width: 100%;
  height: 7%;
`;

Target.TargetItem = styled.div`
  display: flex;
  height: 100%;
`;

Target.TargetText = styled.span`
  margin: auto;
`;
