import React from 'react';
import { Clock } from 'lucide-react';
import type { SlotDetailsProps } from './SlotDetails.types';
import styles from './SlotDetails.module.css';

const SlotDetails: React.FC<SlotDetailsProps> = ({ cityName, foundAt, slots }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.cityTitle}>{cityName}</h4>
        <span className={styles.countBadge}>{slots.length} дат</span>
      </div>

      {foundAt && (
        <div className={styles.timestampRow}>
          <Clock size={12} className={styles.clockIcon} />
          <span>Знайдено: {foundAt}</span>
        </div>
      )}

      <div className={styles.grid}>
        {slots.map((slot) => (
          <span key={slot.datePart} className={styles.dateBadge}>
            {slot.date}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlotDetails;
