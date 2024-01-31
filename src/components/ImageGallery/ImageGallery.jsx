import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image, index) => (
        <li
          key={index}
          className={css.imageGalleryItem}
          onClick={() => {
            openModal(image.largeImageURL);
          }}
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={css.imageGalleryItemImage}
          />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  openModal: PropTypes.func,
};
