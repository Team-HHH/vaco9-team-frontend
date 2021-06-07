import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';
import { SplitLayout as S } from './styles';

export default function SplitLayout({ children }) {
  return (
    <S.SplitLayoutWrapper>
      <S.LeftSection>{children}</S.LeftSection>
      <S.RightSection>
        <S.LogoWrapper>
          <S.Logo src={logo} />
          <S.Slogan>Flexilis Ads</S.Slogan>
          <S.Slogan>헬스케어 기업을 위한 최적의 광고 플랫폼</S.Slogan>
        </S.LogoWrapper>
      </S.RightSection>
    </S.SplitLayoutWrapper>
  );
}

SplitLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
