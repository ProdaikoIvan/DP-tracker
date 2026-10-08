import { getItem, setItem } from '@/services/storageService';
import {
  ACTIVE_TRACKERS_KEY,
  TRACKER_ALARM_PREFIX,
  SLOTS_STORAGE_KEY,
  NOTIFICATIONS_SOUND_KEY,
} from '@/constants/storage.constants';
import { startBadgeBlinking } from '@/services/badgeService';
import { playNotificationSoundInTab } from '@/services/soundService';
import type { ActiveTracker, ActiveTrackersMap, PollingInterval } from '../types/tracker.types';
import type { City } from '@/features/department';
import { checkAvailableSlots } from '@/features/slots';
import type { SlotDay } from '@/features/slots';
import type { SlotsDataMap } from '@/context/SlotsContext.types';

export const getStoredActiveTrackers = async (): Promise<ActiveTrackersMap> => {
  const data = await getItem<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, 'session');
  return data || {};
};

export const startTrackerSession = async (
  city: City,
  countryCode: string,
  tabId: number,
  interval: PollingInterval
): Promise<ActiveTrackersMap> => {
  const current = await getStoredActiveTrackers();
  const nextCheck = Date.now() + interval * 60 * 1000;
  const newTracker: ActiveTracker = {
    cityName: city.name,
    countryCode,
    tabId,
    intervalMinutes: interval,
    nextCheckTimestamp: nextCheck,
  };
  const updated: ActiveTrackersMap = {
    ...current,
    [city.name]: newTracker,
  };
  await setItem(ACTIVE_TRACKERS_KEY, updated, 'session');
  await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${city.name}`, { periodInMinutes: interval });
  return updated;
};

export const stopTrackerSession = async (cityName: string): Promise<ActiveTrackersMap> => {
  const current = await getStoredActiveTrackers();
  if (!current[cityName]) return current;

  const updated = { ...current };
  delete updated[cityName];

  await chrome.alarms.clear(`${TRACKER_ALARM_PREFIX}${cityName}`);
  await setItem(ACTIVE_TRACKERS_KEY, updated, 'session');
  return updated;
};

export const updateTrackerTimestamp = async (
  cityName: string,
  nextCheckTimestamp: number
): Promise<void> => {
  const current = await getStoredActiveTrackers();
  if (!current[cityName]) return;
  const updated: ActiveTrackersMap = {
    ...current,
    [cityName]: {
      ...current[cityName],
      nextCheckTimestamp,
    },
  };
  await setItem(ACTIVE_TRACKERS_KEY, updated, 'session');
};

export const handleFoundSlots = async (
  cityName: string,
  tabId: number,
  slots: SlotDay[]
): Promise<void> => {
  await stopTrackerSession(cityName);

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

export const updateTrackerInterval = async (
  cityName: string,
  interval: PollingInterval
): Promise<ActiveTrackersMap> => {
  const current = await getStoredActiveTrackers();
  if (!current[cityName]) return current;

  const nextCheck = Date.now() + interval * 60 * 1000;
  const updated: ActiveTrackersMap = {
    ...current,
    [cityName]: {
      ...current[cityName],
      intervalMinutes: interval,
      nextCheckTimestamp: nextCheck,
    },
  };

  await setItem(ACTIVE_TRACKERS_KEY, updated, 'session');
  await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${cityName}`, { periodInMinutes: interval });
  return updated;
};

export const performSlotCheck = async (
  cityName: string,
  tabId: number
): Promise<boolean> => {
  const slots = await checkAvailableSlots(tabId);
  if (slots.length > 0) {
    await handleFoundSlots(cityName, tabId, slots);
    return true;
  }
  return false;
};

