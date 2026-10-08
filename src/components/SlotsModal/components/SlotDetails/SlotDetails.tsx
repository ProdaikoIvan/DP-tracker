import React from 'react';
import { Clock, X } from 'lucide-react';
import { IconButton } from '../../../IconButton';
import { formatFoundAt } from '../../../../utils/date';
import type { SlotDetailsProps } from './SlotDetails.types';
import styles from './SlotDetails.module.css';

const SlotDetails: React.FC<SlotDetailsProps> = ({
  cityName,
  foundAt,
  slots,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.cityTitle}>{cityName}</h4>
        <div className={styles.headerActions}>
          <span className={styles.countBadge}>{slots.length} дат</span>
          {onDelete && (
            <IconButton
              icon={X}
              onClick={() => onDelete(cityName)}
              title={`Видалити знайдені дати для ${cityName}`}
              size="sm"
            />
          )}
        </div>
      </div>

      <div className={styles.timestampRow}>
        <Clock size={12} className={styles.clockIcon} />
        <span>Знайдено: {formatFoundAt(foundAt)}</span>
      </div>

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
