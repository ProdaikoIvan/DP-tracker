import React from 'react';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  title,
}) => {
  const variantClass = variant === 'success' ? styles.variantSuccess : styles.variantDefault;

  return (
    <span
      className={`${styles.badge} ${variantClass} ${className}`}
      title={title}
    >
      {children}
    </span>
  );
};

export default Badge;
