import React from 'react';
import { X, Clock } from 'lucide-react';
import type { SlotsModalProps } from './SlotsModal.types';
import styles from './SlotsModal.module.css';

const SlotsModal: React.FC<SlotsModalProps> = ({ isOpen, onClose, slots, foundAt }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Вільні дати ({slots.length})</h3>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Закрити"
          >
            <X size={18} />
          </button>
        </div>

        {foundAt && (
          <div className={styles.timestampRow}>
            <Clock size={12} className={styles.clockIcon} />
            <span>Знайдено: {foundAt}</span>
          </div>
        )}

        <div className={styles.content}>
          {slots.map((slot) => (
            <span key={slot.datePart} className={styles.dateBadge}>
              {slot.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotsModal;
