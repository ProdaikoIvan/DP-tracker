import type { ReactNode } from 'react';
import type { ServiceSlotsData, SlotsDataMap } from '@/features/slots';
import type { ActiveTrackersMap, PollingInterval } from '@/features/tracker';
import type { SelectedDepartment, City, Country } from '@/features/department';

export interface SlotsContextValue {
  slotsMap: SlotsDataMap;
  totalSlots: number;
  servicesWithSlotsCount: number;
  isSoundEnabled: boolean;
  activeTrackers: ActiveTrackersMap;
  selectedDepartment: SelectedDepartment | null;
  selectDepartment: (dept: SelectedDepartment | null) => void;
  toggleSound: () => Promise<void>;
  startCityTracker: (city: City, country: Country, interval: PollingInterval) => Promise<boolean>;
  stopCityTracker: (cityName: string) => Promise<void>;
  updateCityInterval: (cityName: string, interval: PollingInterval) => Promise<void>;
  getServiceSlots: (cityName: string) => ServiceSlotsData | undefined;
  clearSlotsForService: (cityName: string) => Promise<void>;
  clearAllSlots: () => Promise<void>;
}

export interface SlotsProviderProps {
  children: ReactNode;
}
