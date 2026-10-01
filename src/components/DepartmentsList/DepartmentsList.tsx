import React from 'react';
import { MapPin } from 'lucide-react';
import { departments } from '../../data/departments';
import styles from './DepartmentsList.module.css';

const DepartmentsList: React.FC = () => {
  return (
    <div className={styles.container}>
      {departments.map((country) => (
        <div key={country.name} className={styles.countrySection}>
          <h2 className={styles.countryTitle}>
            <span className={styles.flag}>{country.flag}</span> {country.name}
          </h2>
          
          <div className={styles.citiesGrid}>
            {country.cities.map((city) => (
              <div key={city.name} className={styles.cityCard}>
                <div className={styles.cityHeader}>
                  <MapPin size={16} className={styles.pinIcon} />
                  <h3 className={styles.cityName}>{city.name}</h3>
                </div>
                <p className={styles.address}>{city.address}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentsList;
