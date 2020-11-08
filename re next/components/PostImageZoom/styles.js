import stc, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = stc.div`
  position: fixed;
  z-index: 5000;
  top: 0; bottom: 0; right: 0; left: 0;
`;

export const Headr = stc.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 16px;
    color: #333;
    line-height: 44px;
  }
`;

export const CloseBtn = stc(CloseOutlined)`
  position: absolute;
  top: 0; right: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SlickWrapper = stc.div`
  height : clac(100% -44px);
  background: #090909;
`;

export const ImgWrapper = stc.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
  }
`;

export const Indicator = stc.div`
  text-align: cetner;

  & > div {
    width: 75px; height: 30px;
    line-height: 30px; border-radius: 15px; background: #313131;
    display: inline-block; text-align: center; color: white; font-size: 15px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;
