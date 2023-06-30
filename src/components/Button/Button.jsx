import React from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';

const Button = ({ onClick, isDisabled, isLoading }) => {
  return (
    <div className={style.btnBox}>
      <button
        className={style.button}
        type="button"
        onClick={onClick}
        disabled={isDisabled || isLoading}
      >
        {isLoading ? <div className={style.loader}></div> : 'Load more'}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Button;
