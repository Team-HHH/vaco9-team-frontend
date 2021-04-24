import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '400px'}
  height: fit-content;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 5px;
`;
const CardItem = styled.div`
  display: flex;
  width: 100%;
`;

export default function Card({
  children,
  title,
}) {
  return (
    <Container>
      <CardItem>
        <h3>
          {title}
        </h3>
      </CardItem>
      <CardItem>
        {children}
      </CardItem>
    </Container>
  );
}
