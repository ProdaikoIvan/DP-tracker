import React from 'react';
import { Send, Check, Loader2, Power, Bell, AlertCircle } from 'lucide-react';
import { useTelegram } from '../../hooks/useTelegram';
import type { TelegramSettingsProps } from './TelegramSettings.types';
import styles from './TelegramSettings.module.css';

export const TelegramSettings: React.FC<TelegramSettingsProps> = ({ className = '' }) => {
  const {
    config,
    status,
    testStatus,
    startConnect,
    cancelConnect,
    disconnect,
    toggleEnabled,
    sendTest,
  } = useTelegram();

  const getBadge = () => {
    if (status === 'connected') {
      return <span className={`${styles.statusBadge} ${styles.statusConnected}`}>Підключено</span>;
    }
    if (status === 'waiting') {
      return <span className={`${styles.statusBadge} ${styles.statusWaiting}`}>Очікування</span>;
    }
    return <span className={`${styles.statusBadge} ${styles.statusIdle}`}>Вимкнено</span>;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.iconWrapper}>
            <Send size={18} />
          </div>
          <h4 className={styles.title}>Telegram сповіщення</h4>
        </div>
        {getBadge()}
      </div>

      {status === 'idle' && (
        <>
          <p className={styles.description}>
            Отримуйте миттєві push-повідомлення у Telegram, щойно з&apos;являться вільні дати для запису.
          </p>
          <button type="button" className={styles.primaryButton} onClick={startConnect}>
            <Send size={16} />
            Підключити Telegram (1 клік)
          </button>
        </>
      )}

      {status === 'waiting' && (
        <div className={styles.waitingBox}>
          <div className={styles.waitingText}>
            <Loader2 size={16} className={styles.spinner} />
            <span>Відкрито Telegram. Натисніть кнопку <b>Start</b> у боті...</span>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={cancelConnect}>
            Скасувати
          </button>
        </div>
      )}

      {status === 'connected' && (
        <>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Надсилати сповіщення</span>
            <button
              type="button"
              className={`${styles.secondaryButton} ${config.isEnabled ? styles.statusConnected : ''}`}
              onClick={toggleEnabled}
              style={{ flex: 'none', minWidth: '90px' }}
            >
              <Power size={14} />
              {config.isEnabled ? 'Увімкнено' : 'Вимкнено'}
            </button>
          </div>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={sendTest}
              disabled={testStatus === 'sending'}
            >
              {testStatus === 'sending' && <Loader2 size={14} className={styles.spinner} />}
              {testStatus === 'success' && <Check size={14} color="var(--primary-green)" />}
              {testStatus === 'error' && <AlertCircle size={14} color="var(--status-error)" />}
              {testStatus === 'idle' && <Bell size={14} />}
              {testStatus === 'success' ? 'Надіслано!' : testStatus === 'error' ? 'Помилка' : 'Тест'}
            </button>

            <button
              type="button"
              className={`${styles.secondaryButton} ${styles.dangerButton}`}
              onClick={disconnect}
            >
              Відключити
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TelegramSettings;
