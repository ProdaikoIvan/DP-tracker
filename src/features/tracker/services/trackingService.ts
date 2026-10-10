import { getItem, updateItem, removeField } from '@/services/storageService';
import { startBadgeBlinking } from '@/services/badgeService';
import { playNotificationSoundInTab } from '@/services/soundService';
import { openDepartmentTab } from '@/features/department';
import { checkAvailableSlots, saveFoundSlots, clearSlotsForCity } from '@/features/slots';
import { sendTelegramNotification } from '@/features/telegram';
import { ACTIVE_TRACKERS_KEY, TRACKER_ALARM_PREFIX } from '@/constants/storage.constants';
import type { ActiveTrackersMap, PollingInterval } from '../types/tracker.types';
import type { City } from '@/features/department';
import type { SlotDay } from '@/features/slots';

const getTrackers = async (): Promise<ActiveTrackersMap> => {
  const data = await getItem<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, 'session');
  return data ?? {};
};

const setAlarm = async (cityName: string, interval: number): Promise<void> => {
  await chrome.alarms.create(`${TRACKER_ALARM_PREFIX}${cityName}`, {
    delayInMinutes: interval,
    periodInMinutes: interval,
  });
};

const clearAlarm = async (cityName: string): Promise<void> => {
  await chrome.alarms.clear(`${TRACKER_ALARM_PREFIX}${cityName}`);
};

const notifySlots = async (cityName: string, tabId: number, slots: SlotDay[]): Promise<void> => {
  await saveFoundSlots(cityName, slots);
  await startBadgeBlinking();
  await playNotificationSoundInTab(tabId);
  void sendTelegramNotification(cityName, slots);
};

export const stopTracker = async (cityName: string): Promise<void> => {
  await clearAlarm(cityName);
  await removeField<ActiveTrackersMap>(ACTIVE_TRACKERS_KEY, cityName, 'session');
};

export const startTracker = async (
  city: City,
  countryCode: string,
  interval: PollingInterval
): Promise<boolean> => {
  const tab = await openDepartmentTab(city.url);
  if (!tab?.id) return false;

  await clearSlotsForCity(city.name);

  const initialSlots = await checkAvailableSlots(tab.id);
  if (initialSlots === null) return false;

  if (initialSlots.length > 0) {
    await notifySlots(city.name, tab.id, initialSlots);
    return true;
  }

  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    {
      [city.name]: {
        cityName: city.name,
        countryCode,
        tabId: tab.id,
        intervalMinutes: interval,
        nextCheckTimestamp: Date.now() + interval * 60_000,
      },
    },
    'session'
  );

  await setAlarm(city.name, interval);
  return true;
};

export const updateTrackerInterval = async (
  cityName: string,
  interval: PollingInterval
): Promise<void> => {
  const trackers = await getTrackers();
  const current = trackers[cityName];
  if (!current) return;

  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    {
      [cityName]: {
        ...current,
        intervalMinutes: interval,
        nextCheckTimestamp: Date.now() + interval * 60_000,
      },
    },
    'session'
  );

  await setAlarm(cityName, interval);
};

export const handleTrackerAlarm = async (cityName: string): Promise<void> => {
  const trackers = await getTrackers();
  const tracker = trackers[cityName];
  if (!tracker) return stopTracker(cityName);

  try {
    await chrome.tabs.get(tracker.tabId);
  } catch {
    return stopTracker(cityName);
  }

  const slots = await checkAvailableSlots(tracker.tabId);
  if (slots && slots.length > 0) {
    await stopTracker(cityName);
    await notifySlots(cityName, tracker.tabId, slots);
    return;
  }

  await updateItem<ActiveTrackersMap>(
    ACTIVE_TRACKERS_KEY,
    {
      [cityName]: {
        ...tracker,
        nextCheckTimestamp: Date.now() + tracker.intervalMinutes * 60_000,
      },
    },
    'session'
  );
};

export const handleTabClosed = async (closedTabId: number): Promise<void> => {
  const trackers = await getTrackers();
  const tracker = Object.values(trackers).find((t) => t.tabId === closedTabId);
  if (tracker) await stopTracker(tracker.cityName);
};
