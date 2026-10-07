import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { departments } from '../../data/departments';
import CountryCard from '../CountryCard/CountryCard';
import CountryServicesList from '../CountryServicesList/CountryServicesList';
import type { Country } from '../../types/departments.types';
import type { DepartmentsListProps } from './DepartmentsList.types';
import styles from './DepartmentsList.module.css';

const DepartmentsList: React.FC<DepartmentsListProps> = ({ onSelectDepartment }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return departments;

    return departments.filter(
      (country) =>
        country.name.toLowerCase().includes(q) ||
        country.code.toLowerCase().includes(q) ||
        country.cities.some(
          (city) =>
            city.name.toLowerCase().includes(q) ||
            city.address.toLowerCase().includes(q)
        )
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  if (selectedCountry) {
    return (
      <div className={styles.container}>
        <CountryServicesList
          country={selectedCountry}
          onBack={() => setSelectedCountry(null)}
          onSelectDepartment={onSelectDepartment}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук країни або міста..."
          className={styles.searchInput}
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className={styles.clearSearchBtn}
            aria-label="Очистити пошук"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {filteredCountries.length === 0 ? (
        <div className={styles.emptyState}>
          За запитом «{searchQuery}» нічого не знайдено
        </div>
      ) : (
        <div className={styles.countriesGrid}>
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.code}
              country={country}
              onClick={() => setSelectedCountry(country)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentsList;
