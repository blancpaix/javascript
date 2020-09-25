import stc, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = stc.div`
position: fixed;
z-index: 5000;
top: 0;  bottom: 0;  right:0;  left :0;
`;
export const Header = stc.header`    // 태그드 탬플릿 리터럴?
height: 44px;
background: white;
position: relative;
padding: 0;
text-align: center;

& h1 {
  margin: 0;
  font-size: 17px;
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
height: calc(100% - 44px);
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
text-align: center;

& > div {
  width: 75px; height: 30px;
  line-height: 30px; border-radius: 15px; background: #313131;
  display: inline-block; text-align: center; color: white; font-size: 15px;
}
`;
// 이거는 클래스 이름 변경 안되도록 덮어 써버리는것이여 그리고 아무곳에나 넣어주시면 됩니다
// 중간에 class 때문에 막히는거 잇으면 이런거 잘 섞어서 적절하게 잘 활용을 하세요
export const Global = createGlobalStyle`
.slick-slide {
  display: inline-block;
}
`;
