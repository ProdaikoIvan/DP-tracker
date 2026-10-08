import React from 'react';
import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  size = 'sm',
  variant = 'ghost',
  className = '',
  disabled = false,
  active = false,
  badge,
}) => {
  const buttonClasses = [
    styles.button,
    styles[size],
    styles[variant],
    active ? styles.active : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
    >
      <Icon size={iconSizes[size]} />
      {badge !== undefined && (
        <span className={styles.badge}>{badge}</span>
      )}
    </button>
  );
};

export default IconButton;
