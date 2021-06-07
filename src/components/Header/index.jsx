import React from 'react';

import { Header as S } from './styles';
import useHeader from '../../hooks/useHeader';

export default function Header() {
  const { user, handleLogoutClick } = useHeader();

  return (
    <S.Container>
      <S.LeftHeader>
        <S.HeaderItem>
          <S.HeaderLink to="/main">
            Flexilis Ads
          </S.HeaderLink>
        </S.HeaderItem>
      </S.LeftHeader>
      <S.RightHeader>
        <S.HeaderItem>
          <S.HeaderLink to="/campaign/new">
            캠페인 시작하기
          </S.HeaderLink>
        </S.HeaderItem>
        {user ? (
          <>
            <S.HeaderItem>
              <S.HeaderLink to="/dashboard">
                대시보드
              </S.HeaderLink>
            </S.HeaderItem>
            <S.HeaderItem>
              <S.HeaderLink to="/main" onClick={handleLogoutClick}>
                로그아웃
              </S.HeaderLink>
            </S.HeaderItem>
          </>
        ) : (
          <S.HeaderItem>
            <S.HeaderLink to="/login">
              로그인
            </S.HeaderLink>
          </S.HeaderItem>
        )}
      </S.RightHeader>
    </S.Container>
  );
}
