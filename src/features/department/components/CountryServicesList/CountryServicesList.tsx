import React from 'react';
import { NavigationHeader } from '@/components';
import { CityCard } from '../CityCard';
import type { CountryServicesListProps } from './CountryServicesList.types';
import styles from './CountryServicesList.module.css';

const CountryServicesList: React.FC<CountryServicesListProps> = ({
  country,
  onBack,
  onSelectDepartment,
}) => {
  return (
    <div className={styles.container}>
      <NavigationHeader
        onBack={onBack}
        countryCode={country.code}
        title={country.name}
        badge={country.cities.length}
      />

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
