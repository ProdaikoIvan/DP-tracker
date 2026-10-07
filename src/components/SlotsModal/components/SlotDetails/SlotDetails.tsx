import React from 'react';
import { Clock } from 'lucide-react';
import { formatFoundAt } from '../../../../utils/date';
import type { SlotDetailsProps } from './SlotDetails.types';
import styles from './SlotDetails.module.css';

const SlotDetails: React.FC<SlotDetailsProps> = ({ cityName, foundAt, slots }) => {
  const formattedDate = formatFoundAt(foundAt);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.cityTitle}>{cityName}</h4>
        <span className={styles.countBadge}>{slots.length} дат</span>
      </div>

      {formattedDate && (
        <div className={styles.timestampRow}>
          <Clock size={12} className={styles.clockIcon} />
          <span>Знайдено: {formattedDate}</span>
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
