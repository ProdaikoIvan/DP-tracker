import type { SlotsDataMap } from '../../../../types/slots.types';

export interface AllSlotsListProps {
  slotsMap: SlotsDataMap;
  onDeleteSlot?: (cityName: string) => void;
}
