import { createGlobalStyle } from 'styled-components';
import NanumBarunGothicBold from './NanumBarunGothicBold.woff';

export default createGlobalStyle`
  @font-face {
  font-family: 'NanumBarunGothicBold',
  src: local('NanumBarunGothicBold'),
  url(${ NanumBarunGothicBold} format('woff');
  font-weight: 900;
  font-style: normal;
}
`;
