import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loader}>
      <BallTriangle type="Puff" color="#00fff7" height={100} width={100} />
    </div>
  );
};

export default Loader;
