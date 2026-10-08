import React from 'react';
import { Eye } from 'lucide-react';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import type { TrackerStatusBarProps } from './TrackerStatusBar.types';
import styles from './TrackerStatusBar.module.css';

const TrackerStatusBar: React.FC<TrackerStatusBarProps> = ({
  isTracking,
  hasSlots,
  intervalMinutes,
  nextCheckTimestamp,
  onViewSlots,
}) => {
  const isStatusActive = hasSlots || isTracking;

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusIndicator}>
        <div className={isStatusActive ? styles.statusDotActive : styles.statusDotPaused} />
        <span className={isStatusActive ? styles.statusTextActive : styles.statusTextPaused}>
          {hasSlots
            ? 'Знайдено вільні дати!'
            : isTracking
              ? `Моніторинг активний (${intervalMinutes} хв)`
              : 'На паузі'}
        </span>
        {hasSlots && onViewSlots && (
          <button
            type="button"
            className={styles.viewSlotsButton}
            onClick={onViewSlots}
            title="Переглянути вільні дати"
          >
            <Eye size={13} />
            <span>Переглянути</span>
          </button>
        )}
      </div>

      <CountdownTimer
        key={isTracking ? (nextCheckTimestamp ?? 'active') : intervalMinutes}
        isActive={isTracking}
        intervalMinutes={intervalMinutes}
        targetTimestamp={isTracking ? nextCheckTimestamp : null}
      />
    </div>
  );
};

export default TrackerStatusBar;
