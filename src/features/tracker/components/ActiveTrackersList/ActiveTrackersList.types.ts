import type { ActiveTrackersMap } from '../../types/tracker.types';

export interface ActiveTrackersListProps {
  activeTrackers: ActiveTrackersMap;
  onStopTracker: (cityName: string) => void;
}
