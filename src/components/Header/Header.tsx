import React from 'react';
import { RotateCcw, CalendarDays, Bell, BellOff, Settings } from 'lucide-react';
import { IconButton } from '@/components';
import type { HeaderProps } from './Header.types';
import styles from './Header.module.css';

const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenStats,
  servicesCount,
  isSoundEnabled,
  onToggleSound,
  onOpenSettings,
}) => {
  const hasServices = servicesCount > 0;

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
        <IconButton
          icon={RotateCcw}
          onClick={onReset}
          disabled={!hasServices}
          active={hasServices}
          title="Скинути"
          variant="outline"
          size="lg"
        />
        <IconButton
          icon={CalendarDays}
          onClick={onOpenStats}
          disabled={!hasServices}
          active={hasServices}
          badge={hasServices ? servicesCount : undefined}
          title="Статистика вільних дат"
          variant="outline"
          size="lg"
        />
        <IconButton
          icon={isSoundEnabled ? Bell : BellOff}
          onClick={onToggleSound}
          active={isSoundEnabled}
          title={isSoundEnabled ? 'Звукові сповіщення увімкнено' : 'Звукові сповіщення вимкнено'}
          variant="outline"
          size="lg"
        />
        <IconButton
          icon={Settings}
          onClick={onOpenSettings}
          title="Налаштування"
          variant="outline"
          size="lg"
        />
      </div>
    </header>
  );
};

export default Header;
