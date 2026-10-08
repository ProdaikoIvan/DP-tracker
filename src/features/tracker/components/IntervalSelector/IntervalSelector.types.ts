import type { PollingInterval } from '../../types/tracker.types';

export interface IntervalSelectorProps {
  value: PollingInterval;
  onChange: (interval: PollingInterval) => void;
  disabled?: boolean;
}
