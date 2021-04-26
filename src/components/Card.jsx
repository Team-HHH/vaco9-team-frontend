import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '400px'};
  height: fit-content;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 5px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
`;

const CardItem = styled.div`
  display: flex;
  width: 100%;
`;

export default function Card({ children, title }) {
  return (
    <Container>
      <CardItem>
        <CardTitle>
          {title}
        </CardTitle>
      </CardItem>
      <CardItem>
        {children}
      </CardItem>
    </Container>
  );
}

Card.propTypes = {
  children: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};
