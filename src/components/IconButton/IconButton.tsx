import React from 'react';
import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.css';

const iconSizes = {
  sm: 14,
  md: 18,
};

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  size = 'sm',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[size]} ${className}`}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
};

export default IconButton;
