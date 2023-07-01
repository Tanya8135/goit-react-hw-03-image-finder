import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem';

import style from './ImageGallery.module.css';

const ImageGallery = ({images, onImageClick}) => {
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
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
