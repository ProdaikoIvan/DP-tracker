import { useStorage } from '@/hooks';
import { ACTIVE_TRACKERS_KEY } from '@/constants/storage.constants';
import type { ActiveTrackersMap } from '../types/tracker.types';

export const useActiveTrackers = (): ActiveTrackersMap => {
  const [activeTrackers] = useStorage<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, {}, 'session');
  return activeTrackers;
};
