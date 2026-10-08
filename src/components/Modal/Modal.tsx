import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { IconButton } from '../IconButton';
import type { ModalProps } from './Modal.types';
import styles from './Modal.module.css';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modal}
        style={maxWidth ? { maxWidth } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <IconButton icon={X} onClick={onClose} title="Закрити" size="md" />
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
