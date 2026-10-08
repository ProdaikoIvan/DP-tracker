import React from 'react';
import { Play, Pause } from 'lucide-react';
import type { TrackingActionButtonProps } from './TrackingActionButton.types';
import styles from './TrackingActionButton.module.css';

const TrackingActionButton: React.FC<TrackingActionButtonProps> = ({
  isTracking,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${isTracking ? styles.stopButton : styles.startButton}`}
      aria-label={isTracking ? 'Зупинити відстеження' : 'Запустити відстеження'}
      title={isTracking ? 'Зупинити' : 'Запустити'}
    >
      {isTracking ? (
        <>
          <Pause size={15} className={styles.icon} />
          <span>Зупинити відстеження</span>
        </>
      ) : (
        <>
          <Play size={15} fill="currentColor" className={styles.icon} />
          <span>Запустити відстеження</span>
        </>
      )}
    </button>
  );
};

export default TrackingActionButton;
