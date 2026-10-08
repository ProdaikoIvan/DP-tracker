import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import CountryFlag from '../CountryFlag/CountryFlag';
import type { NavigationHeaderProps } from './NavigationHeader.types';
import styles from './NavigationHeader.module.css';

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onBack,
  title,
  countryCode,
  subtitle,
  badge,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Назад"
          title="Назад"
        >
          <ArrowLeft size={16} />
        </button>

        <div className={styles.titleInfo}>
          {countryCode && <CountryFlag code={countryCode} width={22} />}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {badge !== undefined && (
          <span className={styles.badge}>{badge}</span>
        )}
      </div>

      {subtitle && (
        <div className={styles.subtitleRow}>
          <MapPin size={13} className={styles.pinIcon} />
          <span className={styles.subtitleText} title={subtitle}>
            {subtitle}
          </span>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
