import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img style={{ maxWidth: '100%' }} src={`http://localhost:3001/${images[0].src}`} alt={images[0].src} onClick={onZoom} role="presentation" />
        {/* 이미지 클릭은 장애인을 위한것 onClick, role 이런게 그런거임 */}
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3001/${images[0].src}`} alt={images[0].src} onClick={onZoom} role="presentation" />
        <img style={{ width: '50%', display: 'inline-block' }} src={`http://localhost:3001/${images[1].src}`} alt={images[1].src} onClick={onZoom} role="presentation" />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img width="50%" src={`http://localhost:3001/${images[0].src}`} alt={images[0].src} onClick={onZoom} role="presentation" />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
