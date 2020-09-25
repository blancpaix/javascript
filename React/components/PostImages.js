import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import ImageZoom from '../components/ImageZoom';

const PostImages = ({ images }) => {
  console.log('images 확인', images);
  const [showImageZoom, setShowImageZoom] = useState(0);

  const onZoom = useCallback(() => {
    setShowImageZoom(1);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(0);
  }, []);

  // 이미지 0개는 앞에서 이미 처리했다구!
  if (images.length === 1) {

    return (
      <>
        <img style={{ maxHeight: '200px' }} role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImageZoom && < ImageZoom images={images} onClose={onClose} />}
      </>
    )
  }

  if (images.length === 2) {

    return (
      <>
        <img style={{ width: '50%', display: 'inline-block' }} role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <img style={{ width: '50%', display: 'inline-block' }} role="presentation" src={images[1].src} alt={images[1].src} onClick={onZoom} />
        {showImageZoom && < ImageZoom images={images} onClose={onClose} />}
      </>
    )
  }

  return (
    <>
      <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
      <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middel' }} role="presentation" onClick={onZoom}>
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  )

};
PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;

