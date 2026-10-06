import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { departments } from '../../data/departments';
import type { DepartmentsListProps } from './DepartmentsList.types';
import styles from './DepartmentsList.module.css';

const DepartmentsList: React.FC<DepartmentsListProps> = ({ onSelectDepartment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>(['Польща']);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return departments;

    return departments
      .map((country) => ({
        ...country,
        cities: country.cities.filter(
          (city) =>
            city.name.toLowerCase().includes(q) ||
            country.name.toLowerCase().includes(q) ||
            city.address.toLowerCase().includes(q)
        ),
      }))
      .filter((country) => country.cities.length > 0);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const activeAccordionValues = isSearching
    ? filteredCountries.map((c) => c.name)
    : openItems;

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук міста або країни..."
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

      {isSearching && filteredCountries.length === 0 ? (
        <div className={styles.emptyState}>
          За запитом «{searchQuery}» нічого не знайдено
        </div>
      ) : (
        <Accordion.Root
          type="multiple"
          value={activeAccordionValues}
          onValueChange={isSearching ? undefined : setOpenItems}
          className={styles.accordionRoot}
        >
          {filteredCountries.map((country) => (
            <Accordion.Item
              key={country.name}
              value={country.name}
              className={styles.accordionItem}
            >
              <Accordion.Header style={{ margin: 0, display: 'flex' }}>
                <Accordion.Trigger className={styles.accordionTrigger}>
                  <div className={styles.triggerContent}>
                    <span>{country.flag}</span> {country.name}
                  </div>
                  <div className={styles.triggerRight}>
                    <span className={styles.countBadge}>
                      {country.cities.length}
                    </span>
                    <ChevronDown className={styles.chevron} size={16} aria-hidden />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className={styles.accordionContent}>
                <div className={styles.citiesGrid}>
                  {country.cities.map((city) => (
                    <button
                      type="button"
                      key={city.name}
                      className={styles.cityCard}
                      onClick={() => onSelectDepartment({ city, country })}
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
                  ))}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </div>
  );
};

export default DepartmentsList;
