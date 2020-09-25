// 왜 분리를 했느냐
// 스타일드 컴포넌트 때문에 너무 지저분해서 이거를 다 없애시고 new Styles.js 로 만들어ㅓ 이쪽으로 넘겨버리세요 그리고 다 exrpot 를 하세요 깔끔해짐. 그리고 덜 중요한거는 따로 빼는게 좋음
// 코드를 분리하는게 좋아요 깔끔하게    컴포넌트가 커질수록 잘게 쪼개겠조?? 왠만해서는 100줄 안넘는게 좋겟죠??
// 스타일드 컴포넌트 export 해두면 재사용하기에도 좋음

import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';

import { Overlay, Global, Indicator, SlickWrapper, Header, CloseBtn, ImgWrapper } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={currentSlide}
            beforeChange={(slide) => setCurrentSlide(slide)} // 이거는 그냥 {setCurrentSlide}로 끝내도 안됨?
            infinite
            arrows={false}
            slidesToShow={1} // 하나씩만 보이도록 옵션은 독스 참고하시고
            slidesToScroll={1}
          >
            { // 중요한 부분이랍니다!
              images.map((v) => (
                <ImgWrapper key={v.src}>
                  <img src={`http://localhost:3001/${v.src}`} alt={v.src} />
                </ImgWrapper>
              ))
            }
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
