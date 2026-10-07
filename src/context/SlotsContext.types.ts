import type { ReactNode } from 'react';
import type { SlotDay } from '../services/slotService.types';
import type { TrackingState } from '../types/tracking.types';
import type { PollingInterval } from '../components/IntervalSelector/IntervalSelector.types';
import type { SelectedDepartment } from '../types/departments.types';

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
  trackingState: TrackingState;
  toggleSound: () => Promise<void>;
  startTracking: (cityName: string, tabId: number, interval: PollingInterval) => Promise<void>;
  stopTracking: () => Promise<void>;
  getServiceSlots: (cityName: string) => ServiceSlotsData | undefined;
  selectedDepartment: SelectedDepartment | null;
  selectDepartment: (dept: SelectedDepartment | null) => void;
  clearSlotsForService: (cityName: string) => Promise<void>;
  clearAllSlots: () => Promise<void>;
}

export interface SlotsProviderProps {
  children: ReactNode;
}
