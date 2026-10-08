import React from 'react';
import { X } from 'lucide-react';
import { CountryFlag, CountdownTimer, IconButton } from '@/components';
import type { ActiveTrackerItemProps } from './ActiveTrackerItem.types';
import styles from './ActiveTrackerItem.module.css';

const ActiveTrackerItem: React.FC<ActiveTrackerItemProps> = ({
  tracker,
  onStop,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.cityInfo}>
        <CountryFlag code={tracker.countryCode} width={18} />
        <span className={styles.cityName} title={tracker.cityName}>
          {tracker.cityName}
        </span>
      </div>

      <div className={styles.actions}>
        <CountdownTimer
          isActive={true}
          intervalMinutes={tracker.intervalMinutes}
          targetTimestamp={tracker.nextCheckTimestamp}
        />
        <IconButton
          icon={X}
          onClick={onStop}
          title={`Зупинити відстеження (${tracker.cityName})`}
          size="sm"
        />
      </div>
    </div>
  );
};

export default ActiveTrackerItem;
