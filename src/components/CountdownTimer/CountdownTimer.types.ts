import type { PollingInterval } from '../IntervalSelector/IntervalSelector.types';

export interface CountdownTimerProps {
  isActive: boolean;
  intervalMinutes: PollingInterval;
  targetTimestamp?: number | null;
}
