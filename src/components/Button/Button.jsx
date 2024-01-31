import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ show, onClick }) => {
  return (
    <button
      className={css.button}
      style={{ display: show ? 'block' : 'none' }}
      onClick={onClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};
