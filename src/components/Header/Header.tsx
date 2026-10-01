import React from 'react';
import { RotateCw, Bell, Settings, FileText } from 'lucide-react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <FileText size={18} strokeWidth={2.5} color="#111827" />
        </div>
        <h1 className={styles.title}>
          DP Slot Tracker <span className={styles.version}>v1.0.0</span>
        </h1>
      </div>

      <div className={styles.rightSection}>
        <button className={styles.iconButton} aria-label="Reset">
          <RotateCw size={18} color="#9ca3af" />
        </button>
        <button className={`${styles.iconButton} ${styles.activeNotification}`} aria-label="Notifications">
          <Bell size={18} color="#00d06c" />
        </button>
        <button className={styles.iconButton} aria-label="Settings">
          <Settings size={18} color="#9ca3af" />
        </button>
      </div>
    </header>
  );
};

export default Header;
