import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { IconButton } from '../IconButton';
import { Badge } from '../Badge';
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
        <IconButton
          icon={ArrowLeft}
          onClick={onBack}
          title="Назад"
          size="md"
        />

        <div className={styles.titleInfo}>
          {countryCode && <CountryFlag code={countryCode} width={22} />}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {badge !== undefined && (
          <Badge>{badge}</Badge>
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
