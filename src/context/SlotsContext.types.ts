import type { ReactNode } from 'react';
import type { SlotDay } from '../services/slotService.types';
import type { ActiveTrackersMap, PollingInterval } from '../types/tracking.types';
import type { SelectedDepartment, City, Country } from '../types/departments.types';

export interface ServiceSlotsData {
  cityName: string;
  slots: SlotDay[];
  foundAt: number;
}

export type SlotsDataMap = Record<string, ServiceSlotsData>;

export interface SlotsContextValue {
  slotsMap: SlotsDataMap;
  totalSlots: number;
  isSoundEnabled: boolean;
  activeTrackers: ActiveTrackersMap;
  selectedDepartment: SelectedDepartment | null;
  selectDepartment: (dept: SelectedDepartment | null) => void;
  toggleSound: () => Promise<void>;
  startCityTracker: (city: City, country: Country, interval: PollingInterval) => Promise<void>;
  stopCityTracker: (cityName: string) => Promise<void>;
  updateCityInterval: (cityName: string, interval: PollingInterval) => Promise<void>;
  getServiceSlots: (cityName: string) => ServiceSlotsData | undefined;
  clearSlotsForService: (cityName: string) => Promise<void>;
  clearAllSlots: () => Promise<void>;
}

export interface SlotsProviderProps {
  children: ReactNode;
}
