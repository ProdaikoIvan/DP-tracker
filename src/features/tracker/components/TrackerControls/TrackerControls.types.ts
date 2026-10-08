import type { PollingInterval } from '../../types/tracker.types';

export interface TrackerControlsProps {
  interval: PollingInterval;
  onIntervalChange: (interval: PollingInterval) => void;
  isTracking: boolean;
  onToggleTracking: () => void;
  disabled?: boolean;
}
