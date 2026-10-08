import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../Modal';
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
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} maxWidth={320}>
      <div className={styles.body}>
        <div className={styles.iconWrapper}>
          <AlertTriangle size={18} />
        </div>
        <p className={styles.message}>{message}</p>
      </div>

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
    </Modal>
  );
};

export default ConfirmModal;
