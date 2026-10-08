import type { PollingInterval } from '../../types/tracking.types';

export interface TrackerStatusBarProps {
  isTracking: boolean;
  hasSlots: boolean;
  intervalMinutes: PollingInterval;
  nextCheckTimestamp?: number | null;
  onViewSlots?: () => void;
}
