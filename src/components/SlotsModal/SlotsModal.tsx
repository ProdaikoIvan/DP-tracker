import React from 'react';
import { X } from 'lucide-react';
import { IconButton } from '../IconButton';
import type { SlotsModalProps } from './SlotsModal.types';
import styles from './SlotsModal.module.css';

const SlotsModal: React.FC<SlotsModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <IconButton
            icon={X}
            onClick={onClose}
            title="Закрити"
            size="md"
          />
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default SlotsModal;
