import React, { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [toggleImgZoom, setToggleImgzoom] = useState(false);
  const onZoom = useCallback(() => {
    setToggleImgzoom(true);
  }, []);
  const onClose = useCallback(() => {
    setToggleImgzoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          style={{ maxWidth: '100%' }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          role="presentation"
        />
        {toggleImgZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img style={{ width: '50%', display: 'inline-block' }} src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation" />
        <img style={{ width: '50%', display: 'inline-block' }} src={images[1].src} alt={images[1].src} onClick={onZoom} role="presentation" />
      </>
    );
  }

  return (
    <>
      <div>
        <img width="50%" src={images[0].src} alt={images[0].src} onClick={onZoom} role="presentation" />
        <div
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          role="presentation"
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {toggleImgZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostImages;
