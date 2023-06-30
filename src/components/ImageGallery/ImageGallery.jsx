import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <ul className={style.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            imageURL={image.largeImageURL}
            alt={image.tags}
            onImageClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
