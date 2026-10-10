import type { PollingInterval } from '../../types/tracker.types';

export interface TrackerStatusBarProps {
  isTracking: boolean;
  hasSlots: boolean;
  intervalMinutes: PollingInterval;
  nextCheckTimestamp?: number | null;
  hasError?: boolean;
  onViewSlots?: () => void;
}
