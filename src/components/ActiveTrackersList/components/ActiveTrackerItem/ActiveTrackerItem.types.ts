import type { ActiveTracker } from '../../../../types/tracking.types';

export interface ActiveTrackerItemProps {
  tracker: ActiveTracker;
  onStop: () => void;
}
