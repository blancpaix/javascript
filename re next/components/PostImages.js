import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ImageZoom from './PostImageZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = () => {
    console.log('onZoom');
  };
  const onClose = () => {
    console.log('onClose');
  };

  if (images.length === 1) {
    return (
      <>
        <img
          stlye={{ maxWidth: '100%' }}
          src={`http://localhost:3000/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
          role="presentation"
        />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
