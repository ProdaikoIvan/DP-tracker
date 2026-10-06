import React from 'react';
import { CalendarX } from 'lucide-react';
import SlotDetails from '../SlotDetails/SlotDetails';
import type { AllSlotsListProps } from './AllSlotsList.types';
import styles from './AllSlotsList.module.css';

const AllSlotsList: React.FC<AllSlotsListProps> = ({ slotsMap }) => {
  const items = Object.values(slotsMap).filter((item) => item.slots.length > 0);

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <CalendarX size={32} className={styles.emptyIcon} />
        <span>Наразі немає збережених вільних дат</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <SlotDetails
          key={item.cityName}
          cityName={item.cityName}
          foundAt={item.foundAt}
          slots={item.slots}
        />
      ))}
    </div>
  );
};

export default AllSlotsList;
