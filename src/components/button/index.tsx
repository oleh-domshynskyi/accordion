import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from './types';
import styles from './styles.module.scss';


const Button = ({children, onClick, variant, className}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.btn, styles[`btn-${variant}`], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;