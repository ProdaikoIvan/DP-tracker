import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { IconButton, CountryFlag, Badge } from '@/components';
import { findDepartmentByCityName } from '@/services/tabService';
import { formatFoundAt } from '@/utils/date';
import type { SlotDetailsProps } from './SlotDetails.types';
import styles from './SlotDetails.module.css';

const SlotDetails: React.FC<SlotDetailsProps> = ({
  cityName,
  foundAt,
  slots,
  onDelete,
}) => {
  const dept = findDepartmentByCityName(cityName);
  const countryCode = dept?.country.code;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.cityHeader}>
          {countryCode && <CountryFlag code={countryCode} width={18} />}
          <h4 className={styles.cityTitle}>{cityName}</h4>
        </div>
        <div className={styles.headerActions}>
          <Badge variant="success">{slots.length} дат</Badge>
          {onDelete && (
            <IconButton
              icon={Trash2}
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
