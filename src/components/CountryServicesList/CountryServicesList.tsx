import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CountryFlag from '../CountryFlag/CountryFlag';
import CityCard from '../CityCard/CityCard';
import type { CountryServicesListProps } from './CountryServicesList.types';
import styles from './CountryServicesList.module.css';

const CountryServicesList: React.FC<CountryServicesListProps> = ({
  country,
  onBack,
  onSelectDepartment,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.backHeader}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Назад до списку країн"
          title="Назад до списку країн"
        >
          <ArrowLeft size={16} />
        </button>
        <div className={styles.countryHeaderInfo}>
          <CountryFlag code={country.code} width={22} />
          <h2 className={styles.countryTitle}>{country.name}</h2>
        </div>
        <span className={styles.citiesCountBadge}>
          {country.cities.length}
        </span>
      </div>

      <div className={styles.citiesList}>
        {country.cities.map((city) => (
          <CityCard
            key={`${city.name}-${city.address}`}
            city={city}
            onClick={() => onSelectDepartment({ city, country })}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryServicesList;
