import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';
import { departments } from '../../data/departments';
import type { DepartmentsListProps } from './DepartmentsList.types';
import styles from './DepartmentsList.module.css';

const DepartmentsList: React.FC<DepartmentsListProps> = ({ onSelectDepartment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.introBlock}>
        <h2 className={styles.introTitle}>Доступні відділення</h2>
        <p className={styles.introDescription}>
          Оберіть потрібне місто зі списку запису в чергу:
        </p>
      </div>

      <Accordion.Root
        type="single"
        collapsible
        defaultValue="Польща"
        className={styles.accordionRoot}
      >
        {departments.map((country) => (
          <Accordion.Item key={country.name} value={country.name} className={styles.accordionItem}>
            <Accordion.Header className={styles.accordionHeader}>
              <Accordion.Trigger className={styles.accordionTrigger}>
                <div className={styles.triggerContent}>
                  <span className={styles.flag}>{country.flag}</span> {country.name}
                </div>
                <ChevronDown className={styles.chevron} size={20} aria-hidden />
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
                    <div className={styles.cityHeader}>
                      <MapPin size={16} className={styles.pinIcon} />
                      <h3 className={styles.cityName}>{city.name}</h3>
                    </div>
                    <p className={styles.address}>{city.address}</p>
                  </button>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default DepartmentsList;
