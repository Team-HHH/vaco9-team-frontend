import { createGlobalStyle } from 'styled-components';
import NotoSansKR from './NotoSansKR-Black.woff';

export default createGlobalStyle`
  @font-face {
  font-family: 'Noto',
  src: local('Noto'),
  url(${NotoSansKR}) format('woff');
  font-weight: 300;
  font-style: normal;
}
`;
