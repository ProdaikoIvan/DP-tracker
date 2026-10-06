import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ConfirmModalProps } from './ConfirmModal.types';
import styles from './ConfirmModal.module.css';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Підтвердження',
  message,
  confirmText = 'Так',
  cancelText = 'Ні',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertTriangle size={18} />
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
