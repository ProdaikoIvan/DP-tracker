import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import type { CityCardProps } from './CityCard.types';
import styles from './CityCard.module.css';

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
    >
      <div className={styles.cardInfo}>
        <div className={styles.cityHeader}>
          <MapPin size={15} className={styles.pinIcon} />
          <h3 className={styles.cityName}>{city.name}</h3>
        </div>
        <p className={styles.address}>{city.address}</p>
      </div>
      <ChevronRight size={16} className={styles.arrowIcon} />
    </button>
  );
};

export default CityCard;
