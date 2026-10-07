import React from 'react';
import { ChevronRight } from 'lucide-react';
import CountryFlag from '../CountryFlag/CountryFlag';
import type { CountryCardProps } from './CountryCard.types';
import styles from './CountryCard.module.css';

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      title={country.name}
      aria-label={`${country.name} (${country.cities.length})`}
    >
      <div className={styles.flagSection}>
        <CountryFlag code={country.code} width={20} />
        <span className={styles.countryCode}>{country.code}</span>
      </div>
      <div className={styles.rightSection}>
        <span className={styles.countBadge}>
          {country.cities.length}
        </span>
        <ChevronRight size={13} className={styles.arrowIcon} aria-hidden />
      </div>
    </button>
  );
};

export default CountryCard;
