import React from 'react';
import { Eye } from 'lucide-react';
import { CountdownTimer } from '@/components';
import type { TrackerStatusBarProps } from './TrackerStatusBar.types';
import styles from './TrackerStatusBar.module.css';

const TrackerStatusBar: React.FC<TrackerStatusBarProps> = ({
  isTracking,
  hasSlots,
  intervalMinutes,
  nextCheckTimestamp,
  hasError = false,
  onViewSlots,
}) => {
  const isStatusActive = hasSlots || isTracking;

  const getStatusDotClass = (): string => {
    if (hasError) return styles.statusDotError;
    if (isStatusActive) return styles.statusDotActive;
    return styles.statusDotPaused;
  };

  const getStatusTextClass = (): string => {
    if (hasError) return styles.statusTextError;
    if (isStatusActive) return styles.statusTextActive;
    return styles.statusTextPaused;
  };

  const getStatusText = (): string => {
    if (hasSlots) return 'Знайдено вільні дати!';
    if (hasError) return 'Помилка';
    if (isTracking) return `Моніторинг активний (${intervalMinutes} хв)`;
    return 'На паузі';
  };

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusIndicator}>
        <div className={getStatusDotClass()} />
        <span className={getStatusTextClass()}>
          {getStatusText()}
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
