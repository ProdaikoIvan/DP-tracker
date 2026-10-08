import type { SlotsDataMap } from '../types/slots.types';

export interface UseSlotsResult {
  slotsMap: SlotsDataMap;
  totalSlots: number;
  servicesWithSlotsCount: number;
}
