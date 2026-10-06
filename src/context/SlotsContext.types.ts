import type { ReactNode } from 'react';
import type { SlotDay } from '../services/slotService.types';

export interface ServiceSlotsData {
  cityName: string;
  slots: SlotDay[];
  foundAt: string;
}

export type SlotsDataMap = Record<string, ServiceSlotsData>;

export interface SlotsContextValue {
  slotsMap: SlotsDataMap;
  totalSlots: number;
  getServiceSlots: (cityName: string) => ServiceSlotsData | undefined;
  saveSlotsForService: (cityName: string, slots: SlotDay[], foundAt: string) => Promise<void>;
  clearSlotsForService: (cityName: string) => Promise<void>;
  clearAllSlots: () => Promise<void>;
}

export interface SlotsProviderProps {
  children: ReactNode;
}
