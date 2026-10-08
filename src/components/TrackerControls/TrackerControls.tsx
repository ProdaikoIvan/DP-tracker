import React from 'react';
import IntervalSelector from '../IntervalSelector/IntervalSelector';
import TrackingActionButton from '../TrackingActionButton/TrackingActionButton';
import type { TrackerControlsProps } from './TrackerControls.types';
import styles from './TrackerControls.module.css';

const TrackerControls: React.FC<TrackerControlsProps> = ({
  interval,
  onIntervalChange,
  isTracking,
  onToggleTracking,
  disabled = false,
}) => {
  return (
    <div className={`${styles.card} ${isTracking ? styles.cardActive : ''}`}>
      <IntervalSelector
        value={interval}
        onChange={onIntervalChange}
        disabled={disabled}
      />
      <TrackingActionButton
        isTracking={isTracking}
        onClick={onToggleTracking}
        disabled={disabled}
      />
    </div>
  );
};

export default TrackerControls;
