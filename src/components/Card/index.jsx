import React from 'react';
import PropTypes from 'prop-types';

import { Card as S } from './styles';

export default function Card({ children, title }) {
  return (
    <S.Container>
      <S.CardItem>
        <S.CardTitle>
          {title}
        </S.CardTitle>
      </S.CardItem>
      <S.CardItem>
        {children}
      </S.CardItem>
    </S.Container>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
