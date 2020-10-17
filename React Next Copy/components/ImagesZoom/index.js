import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <header>
        <h1>상세 이미지</h1>
        <div style={{ backgroundColor: 'green' }} onClick={onClose}>X</div>
      </header>
      <Slick
        initialSlide={currentSlide}
        beforeChange={(slide) => setCurrentSlide(slide)}
        infinite
        arrows
        slidesToShow={1}
        slidesToScroll={1}
      >
        {images.map((v) => (
          <div key={v.src}>
            <img src={v.src} alt={v.src} />
          </div>
        ))}
      </Slick>
      <div>
        {currentSlide + 1}
        {' '}
        /
        {images.length}
      </div>
    </>
  );
};

export default ImagesZoom;
