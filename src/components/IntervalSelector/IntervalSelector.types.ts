export type PollingInterval = 1 | 2 | 3 | 5;

export interface IntervalSelectorProps {
  value: PollingInterval;
  onChange: (interval: PollingInterval) => void;
}
