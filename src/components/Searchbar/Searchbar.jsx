import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    handleSearch();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm}>
        <button
          type="submit"
          onClick={handleSubmit}
          className={css.searchFormButton}
        >
          <span>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          name="keywords"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};
