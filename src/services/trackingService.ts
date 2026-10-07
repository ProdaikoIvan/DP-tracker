import { getItem, setItem } from './storageService';
import { TRACKING_STATE_KEY, TRACKING_ALARM_NAME, SLOTS_STORAGE_KEY, NOTIFICATIONS_SOUND_KEY } from '../constants/storage.constants';
import { startBadgeBlinking } from './badgeService';
import { playNotificationSoundInTab } from './soundService';
import type { TrackingState } from '../types/tracking.types';
import type { PollingInterval } from '../components/IntervalSelector/IntervalSelector.types';
import type { SlotDay } from './slotService.types';
import type { SlotsDataMap } from '../context/SlotsContext.types';

export const initialTrackingState: TrackingState = {
  isTracking: false,
  cityName: null,
  tabId: null,
  intervalMinutes: 1,
  nextCheckTimestamp: null,
};

export const getStoredTrackingState = async (): Promise<TrackingState> => {
  const state = await getItem<TrackingState>(TRACKING_STATE_KEY);
  return state || initialTrackingState;
};

export const startTrackingSession = async (
  cityName: string,
  tabId: number,
  interval: PollingInterval
): Promise<TrackingState> => {
  const nextCheck = Date.now() + interval * 60 * 1000;
  const newState: TrackingState = {
    isTracking: true,
    cityName,
    tabId,
    intervalMinutes: interval,
    nextCheckTimestamp: nextCheck,
  };
  await setItem(TRACKING_STATE_KEY, newState);
  await chrome.alarms.create(TRACKING_ALARM_NAME, { periodInMinutes: interval });
  return newState;
};

export const stopTrackingSession = async (currentState?: TrackingState): Promise<TrackingState> => {
  const base = currentState || (await getStoredTrackingState());
  const newState: TrackingState = {
    ...base,
    isTracking: false,
    nextCheckTimestamp: null,
  };
  await chrome.alarms.clear(TRACKING_ALARM_NAME);
  await setItem(TRACKING_STATE_KEY, newState);
  return newState;
};

export const handleFoundSlots = async (cityName: string, tabId: number, slots: SlotDay[]): Promise<void> => {
  await stopTrackingSession();

  const currentSlotsMap = (await getItem<SlotsDataMap>(SLOTS_STORAGE_KEY)) || {};
  const updatedSlotsMap: SlotsDataMap = {
    ...currentSlotsMap,
    [cityName]: {
      cityName,
      slots,
      foundAt: Date.now(),
    },
  };

  await setItem(SLOTS_STORAGE_KEY, updatedSlotsMap);

  await startBadgeBlinking();

  const soundEnabled = await getItem<boolean>(NOTIFICATIONS_SOUND_KEY);
  if (soundEnabled !== false) {
    await playNotificationSoundInTab(tabId);
  }
};
