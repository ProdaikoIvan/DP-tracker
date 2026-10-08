import type { PollingInterval } from '../../types/tracking.types';

export interface TrackerControlsProps {
  interval: PollingInterval;
  onIntervalChange: (interval: PollingInterval) => void;
  isTracking: boolean;
  onToggleTracking: () => void;
  disabled?: boolean;
}
