import React from 'react';
import { X } from 'lucide-react';
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
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Закрити"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default SlotsModal;
