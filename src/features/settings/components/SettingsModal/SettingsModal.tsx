import React from 'react';
import { Modal } from '@/components';
import { TelegramSettings } from '@/features/telegram';
import type { SettingsModalProps } from './SettingsModal.types';
import styles from './SettingsModal.module.css';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Налаштування" maxWidth="400px">
      <div className={styles.container}>
        <TelegramSettings />
      </div>
    </Modal>
  );
};

export default SettingsModal;
