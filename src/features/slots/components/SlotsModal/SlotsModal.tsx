import React from 'react';
import { Modal } from '@/components';
import type { SlotsModalProps } from './SlotsModal.types';

const SlotsModal: React.FC<SlotsModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </Modal>
  );
};

export default SlotsModal;
