import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

import style from './Searchbar.module.css';

class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    const { onSubmit } = this.props;

    onSubmit(inputValue);
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue } = this.state;
    const isBtnDisable = inputValue === '';
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={style.button}
            disabled={isBtnDisable}
          >
            <span className={style['button-label']}>Search</span>
            <BiSearchAlt className={style.searchIcon} />
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
