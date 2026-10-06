import type { SlotDay } from '../../services/slotService.types';

export interface SlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slots: SlotDay[];
  foundAt: string;
}
