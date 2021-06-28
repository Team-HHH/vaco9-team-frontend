import styled from 'styled-components';

export const Card = {};

Card.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '90%'};
  height: fit-content;
  justify-content: flex-start;
  padding: 15px 15px 15px 0;
  margin-left: 30px;
`;

Card.CardTitle = styled.span`
  margin: 0 0 10px 0;
  padding-left: 10px;
`;

Card.CardItem = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 7px;
`;
