import React from 'react';
import { Clock } from 'lucide-react';
import type { IntervalSelectorProps, PollingInterval } from './IntervalSelector.types';
import styles from './IntervalSelector.module.css';

const INTERVALS: readonly PollingInterval[] = [1, 2, 3, 5];

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={14} className={styles.clockIcon} />
        <span className={styles.title}>Інтервал перевірки</span>
      </div>
      <div className={styles.grid}>
        {INTERVALS.map((interval) => (
          <button
            key={interval}
            type="button"
            onClick={() => onChange(interval)}
            className={`${styles.button} ${value === interval ? styles.buttonActive : ''}`}
          >
            {interval} хв
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntervalSelector;
