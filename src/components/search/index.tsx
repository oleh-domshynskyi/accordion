import React from 'react';
import { SearchProps } from './types';
import styles from './styles.module.scss';
import Button from '../button';
import { ReactComponent as PlusIcon } from '../../images/plus.svg';


const Search = ({onChange, onPlusClick}: SearchProps) => {
  return (
    <div className={styles.searchWrap}>
      <input
        className={styles.searchInput}
        placeholder="Search project"
        onChange={onChange}
      />
      <Button onClick={onPlusClick} variant="primary">
        <PlusIcon />
      </Button>
    </div>
  );
};

export default Search;