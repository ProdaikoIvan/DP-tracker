import React from 'react';
import {
  UA, PL, CZ, SK, DE, ES, IT, BG, MD, CA, GB, BE, SI,
} from 'country-flag-icons/react/3x2';
import type { CountryFlagProps } from './CountryFlag.types';
import styles from './CountryFlag.module.css';

const flagMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UA, PL, CZ, SK, DE, ES, IT, BG, MD, CA, GB, BE, SI,
};

const CountryFlag: React.FC<CountryFlagProps> = ({ code, width = 24 }) => {
  const FlagComponent = flagMap[code.toUpperCase()];

  if (!FlagComponent) {
    return null;
  }

  return (
    <span className={styles.flagWrapper} style={{ width }}>
      <FlagComponent className={styles.flagSvg} />
    </span>
  );
};

export default CountryFlag;
