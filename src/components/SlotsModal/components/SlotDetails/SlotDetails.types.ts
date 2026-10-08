import type { ServiceSlotsData } from '../../../../context/SlotsContext.types';

export interface SlotDetailsProps extends ServiceSlotsData {
  onDelete?: (cityName: string) => void;
}
