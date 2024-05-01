import React from 'react';

import styles from './StatCard.module.scss';
import classNames from 'classnames';

interface IStatCard {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: IStatCard) => {
  return (
    <>
      <div className={ styles.statCard }>
        <div className={ styles.value }>
          { value }
        </div>
        <div className={ classNames("text-gray-900", styles.label ) }>
          { label }
        </div>
      </div>
    </>
  );
};

export default StatCard;
