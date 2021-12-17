import React, { useState } from 'react';
import classNames from 'classnames';
import { ProjectProps } from './types';
import styles from './styles.module.scss';
import Button from '../button';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as CheckmarkIcon } from '../../images/checkmark.svg';


const Project = ({projectName, tasks, isOpened, onArrowClick, onSearchClick, isInputOpened, onInputBlur}: ProjectProps) => {
  const [inputValue, setInputValue] = useState('');

  const filterTasks = tasks.filter((el: any) => el.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);

  const getProjectPercent = (tasks: any) => {
    let sum = 0;
    tasks.map((el: any) => {
      sum = el.percent + sum;
    })
    return Math.round(sum / tasks.length);
  }

  return (
    <div className={styles.projectWrap}>
      <div className={classNames(styles.projectHeader, {[styles.closed]: !isOpened})}>
        <div className={styles.headerInfo}>
          <div className={styles.projectPercent}>
            {getProjectPercent(tasks)} %
          </div>
          <span className={styles.projectName}>
            {projectName}
          </span>
        </div>
        <div className={styles.headerNav}>
          <input
            placeholder="Search tasks"
            className={classNames(styles.headerInput, {[styles.active]: isInputOpened})}
            onChange={(e: any) => setInputValue(e.target.value)}
            onBlur={() => {onInputBlur(); filterTasks.length < 1 && setInputValue('');}}
            value={inputValue}
            type="text"
            autoFocus
          />
          <Button
            onClick={onSearchClick}
            variant="secondary"
          >
            <SearchIcon />
          </Button>
          <Button
            onClick={onArrowClick}
            variant="secondary"
            className={styles.arrowBtn}
          >
            <ArrowIcon className={classNames(styles.arrow, {[styles.rotate]: isOpened})} />
          </Button>
        </div>
      </div>
      <div className={classNames(styles.projectBody, {[styles.active]: isOpened})}>
        {filterTasks.length > 0 ? (
          filterTasks.map((el:any, i: number) => (
          <div className={styles.taskWrap} key={i}>
            <div className={styles.taskPercent}>
              {el.percent === 100 ? (
                <span>READY</span>) : (
                  <span>
                    {el.percent} %
                  </span>
              )}
            </div>
            <span className={classNames(styles.taskName, {[styles.done]: el.percent === 100})}>
              {el.name}
              {el.percent === 100 && (
                <CheckmarkIcon className={styles.checkmark} />
              )}
            </span>
          </div> )
        )) : (
          <div className={styles.noResults}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Project;