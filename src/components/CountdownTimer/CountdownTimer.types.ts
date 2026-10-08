import type { PollingInterval } from '../../types/tracking.types';

export interface CountdownTimerProps {
  isActive: boolean;
  intervalMinutes: PollingInterval;
  targetTimestamp?: number | null;
}
