import type { ReactNode } from 'react';

export interface SlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
