import React from 'react';
import PropTypes from 'prop-types';

import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageURL, alt, onImageClick }) => (
  <li className={style['gallery-item']}>
    <img
      className={style.imgGI}
      src={imageURL}
      alt={alt}
      onClick={() => onImageClick(imageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
