// 컴포넌트가 복잡해지면 이렇게 쓰세요~
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { useState } from 'react'
import Slick from 'react-slick'

import std, { createGlobalStyle } from 'styled-components';

const Overlay = std.div`
  position : fixed;
  z-index: 5000;
  top: 0; left: 0; right: 0; bottom: 0;
`;

const Header = std.header`
  height: 44px;
  backgrond: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height : 44px;
  }

  & button {
    position : absolute;
    right : 0;
    top: 0;
    padding: 15px;
    line-height; 14px;
    cursor: pointer;
  }
`;

const SlickWrapper = std.div`
  height: calc(100% - 44px);
  background : #090909;

  & img {
    margin: 0 auto;
    max-height : 750px;
  }
`;

const Indicator = std.div`
  text-align; center;

  & > div {
    width : 75px;
    height : 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    diplay: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }  
`;


const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global>
        <Header>
          <h1>상세 이미지</h1>
          <Button onClick={onClose} >X</Button>
        </Header>
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0}
              afterChange={slide => setCurrentSlide(slide)}
              infinite
              arrows={false}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map(v => {
                <div key={v.src}>
                  <img src={v.src} alt={v.src} />
                </div>
              })}
            </Slick>
          </div>
        </SlickWrapper>
      </Global>
    </Overlay>
  )
};

ImageZoom.propType = {
  Images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageZoom;