import type { PollingInterval } from '../../types/tracking.types';

export interface IntervalSelectorProps {
  value: PollingInterval;
  onChange: (interval: PollingInterval) => void;
  disabled?: boolean;
}
