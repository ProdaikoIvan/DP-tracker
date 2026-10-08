import { getItem, updateItem, removeField } from '@/services/storageService';
import { ACTIVE_TRACKERS_KEY, TRACKER_ALARM_PREFIX, NOTIFICATIONS_SOUND_KEY } from '@/constants/storage.constants';
import { startBadgeBlinking } from '@/services/badgeService';
import { playNotificationSoundInTab } from '@/services/soundService';
import { openDepartmentTab } from '@/features/department';
import { checkAvailableSlots, saveFoundSlots, clearSlotsForCity } from '@/features/slots';
import type { ActiveTrackersMap, PollingInterval } from '../types/tracker.types';
import type { City } from '@/features/department';
import type { SlotDay } from '@/features/slots';

const getStoredActiveTrackers = async (): Promise<ActiveTrackersMap> => {
  const data = await getItem<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, 'session');
  return data || {};
};

const handleFoundSlots = async (
  cityName: string,
  tabId: number,
  slots: SlotDay[]
): Promise<void> => {
  await stopTrackerSession(cityName);
  await saveFoundSlots(cityName, slots);
  await startBadgeBlinking();
  const soundEnabled = await getItem<boolean>(NOTIFICATIONS_SOUND_KEY);
  if (soundEnabled !== false) await playNotificationSoundInTab(tabId);
};

const updateTrackerTimestamp = async (
  cityName: string,
  nextCheckTimestamp: number
): Promise<void> => {
  const current = await getStoredActiveTrackers();
  if (!current[cityName]) return;
  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    { [cityName]: { ...current[cityName], nextCheckTimestamp } },
    'session'
  );
};

const performSlotCheck = async (cityName: string, tabId: number): Promise<boolean> => {
  try {
    await chrome.tabs.get(tabId);
  } catch {
    await stopTrackerSession(cityName);
    return false;
  }

  const slots = await checkAvailableSlots(tabId);
  if (slots && slots.length > 0) {
    await handleFoundSlots(cityName, tabId, slots);
    return true;
  }
  return false;
};

export const startTracker = async (
  city: City,
  countryCode: string,
  interval: PollingInterval
): Promise<boolean> => {
  const tab = await openDepartmentTab(city.url);
  if (!tab?.id) return false;

  const initialSlots = await checkAvailableSlots(tab.id);
  if (initialSlots === null) return false;

  await clearSlotsForCity(city.name);

  const nextCheck = Date.now() + interval * 60 * 1000;
  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    { [city.name]: { cityName: city.name, countryCode, tabId: tab.id, intervalMinutes: interval, nextCheckTimestamp: nextCheck } },
    'session'
  );

  await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${city.name}`, {
    delayInMinutes: interval,
    periodInMinutes: interval,
  });

  if (initialSlots.length > 0) {
    await handleFoundSlots(city.name, tab.id, initialSlots);
  }
  return true;
};

export const stopTrackerSession = async (cityName: string): Promise<void> => {
  await chrome.alarms.clear(`${TRACKER_ALARM_PREFIX}${cityName}`);
  await removeField<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, cityName, 'session');
};

export const updateTrackerInterval = async (
  cityName: string,
  interval: PollingInterval
): Promise<void> => {
  const current = await getStoredActiveTrackers();
  const tracker = current[cityName];
  if (!tracker) return;

  const nextCheck = Date.now() + interval * 60 * 1000;
  await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${cityName}`, {
    delayInMinutes: interval,
    periodInMinutes: interval,
  });
  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    { [cityName]: { ...tracker, intervalMinutes: interval, nextCheckTimestamp: nextCheck } },
    'session'
  );
};

export const handleTrackerAlarm = async (cityName: string): Promise<void> => {
  const trackers = await getStoredActiveTrackers();
  const tracker = trackers[cityName];
  if (!tracker) {
    await chrome.alarms.clear(`${TRACKER_ALARM_PREFIX}${cityName}`);
    return;
  }

  const nextCheck = Date.now() + tracker.intervalMinutes * 60 * 1000;
  await updateTrackerTimestamp(cityName, nextCheck);
  await performSlotCheck(cityName, tracker.tabId);
};

export const handleTabClosed = async (closedTabId: number): Promise<void> => {
  const trackers = await getStoredActiveTrackers();
  const tracker = Object.values(trackers).find((t) => t.tabId === closedTabId);
  if (tracker) await stopTrackerSession(tracker.cityName);
};
