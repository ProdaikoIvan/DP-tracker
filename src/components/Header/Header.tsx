import React from 'react';
import { ArrowLeft, RotateCcw, CalendarDays, Bell, BellOff, Settings } from 'lucide-react';
import type { HeaderProps } from './Header.types';
import styles from './Header.module.css';

const Header: React.FC<HeaderProps> = ({
  onBack,
  showBackButton,
  onReset,
  onOpenStats,
  hasSlots,
  slotsCount,
  isSoundEnabled,
  onToggleSound,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src="/icon48.png" alt="Logo" className={styles.logo} />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>DP Tracker</h1>
          <span className={styles.version}>v1.0.0</span>
        </div>
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
        <button
          type="button"
          className={`${styles.iconButton} ${hasSlots ? styles.active : ''}`}
          onClick={onReset}
          disabled={!hasSlots}
          aria-label="Скинути"
          title="Скинути"
        >
          <RotateCcw size={18} />
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${styles.statsButton} ${hasSlots ? styles.active : ''}`}
          onClick={onOpenStats}
          disabled={!hasSlots}
          aria-label="Статистика вільних дат"
          title="Статистика вільних дат"
        >
          <CalendarDays size={18} />
          {hasSlots && (slotsCount ?? 0) > 0 && (
            <span className={styles.badgeCount}>{slotsCount}</span>
          )}
        </button>
        <button
          type="button"
          className={`${styles.iconButton} ${isSoundEnabled ? styles.active : ''}`}
          onClick={onToggleSound}
          aria-label={isSoundEnabled ? 'Вимкнути звук сповіщень' : 'Увімкнути звук сповіщень'}
          title={isSoundEnabled ? 'Звукові сповіщення увімкнено' : 'Звукові сповіщення вимкнено'}
        >
          {isSoundEnabled ? <Bell size={18} /> : <BellOff size={18} />}
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Налаштування"
          title="Налаштування"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
