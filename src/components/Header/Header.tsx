import React from 'react';
import { ArrowLeft, RotateCw, Bell, Settings } from 'lucide-react';
import type { HeaderProps } from './Header.types';
import styles from './Header.module.css';

const Header: React.FC<HeaderProps> = ({ onBack, showBackButton }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src="/icon48.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>
          DP Tracker <span className={styles.version}>v1.0.0</span>
        </h1>
      </div>

      <div className={styles.rightSection}>
        {showBackButton && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onBack}
            aria-label="До списку відділень"
            title="До списку відділень"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <button className={styles.iconButton} aria-label="Оновити" title="Оновити">
          <RotateCw size={18} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.activeNotification}`}
          aria-label="Сповіщення"
          title="Сповіщення"
        >
          <Bell size={18} />
        </button>
        <button className={styles.iconButton} aria-label="Налаштування" title="Налаштування">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
