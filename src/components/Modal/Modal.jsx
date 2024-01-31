import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ show, imageURL, onClose }) => {
  return (
    show && (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img className={css.modalImage} src={imageURL} alt="" />
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  imageURL: PropTypes.string,
  onClose: PropTypes.func,
};
