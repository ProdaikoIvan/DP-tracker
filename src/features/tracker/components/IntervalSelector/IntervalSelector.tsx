import React from 'react';
import { Clock } from 'lucide-react';
import type { PollingInterval } from '../../types/tracker.types';
import type { IntervalSelectorProps } from './IntervalSelector.types';
import styles from './IntervalSelector.module.css';

const INTERVALS: readonly PollingInterval[] = [1, 2, 3, 5];

const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelRow}>
        <Clock size={14} className={styles.clockIcon} />
        <span className={styles.labelText}>Інтервал:</span>
      </div>

      <div className={styles.chipsGroup}>
        {INTERVALS.map((interval) => (
          <button
            key={interval}
            type="button"
            disabled={disabled}
            onClick={() => onChange(interval)}
            className={`${styles.chip} ${value === interval ? styles.chipActive : ''}`}
            aria-label={`${interval} хвилини`}
          >
            {interval} хв
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntervalSelector;
