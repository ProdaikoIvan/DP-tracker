import type { ServiceSlotsData } from '../../../../types/slots.types';

export interface SlotDetailsProps extends ServiceSlotsData {
  onDelete?: (cityName: string) => void;
}
