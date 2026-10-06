import type { SlotDay } from '../../../../services/slotService.types';

export interface SlotDetailsProps {
  cityName: string;
  foundAt?: string;
  slots: SlotDay[];
}
