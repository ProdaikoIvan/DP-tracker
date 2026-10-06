import type { PollingInterval } from '../components/IntervalSelector/IntervalSelector.types';

export interface TrackingState {
  isTracking: boolean;
  cityName: string | null;
  tabId: number | null;
  intervalMinutes: PollingInterval;
  nextCheckTimestamp: number | null;
}
