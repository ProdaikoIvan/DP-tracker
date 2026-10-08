import type { ActiveTrackersMap } from '../../types/tracking.types';

export interface ActiveTrackersListProps {
  activeTrackers: ActiveTrackersMap;
  onStopTracker: (cityName: string) => void;
}
