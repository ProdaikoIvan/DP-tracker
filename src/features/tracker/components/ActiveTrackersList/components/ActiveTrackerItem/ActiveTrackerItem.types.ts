import type { ActiveTracker } from '../../../../types/tracker.types';

export interface ActiveTrackerItemProps {
  tracker: ActiveTracker;
  onStop: () => void;
}
