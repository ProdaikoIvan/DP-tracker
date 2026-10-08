import { checkAvailableSlots } from '../services/slotService';
import { stopBadgeBlinking } from '../services/badgeService';
import { TRACKER_ALARM_PREFIX } from '../constants/storage.constants';
import {
  getStoredActiveTrackers,
  updateTrackerTimestamp,
  handleFoundSlots,
  stopTrackerSession,
} from '../services/trackingService';

const handleAlarmCheck = async (cityName: string): Promise<void> => {
  const trackers = await getStoredActiveTrackers();
  const tracker = trackers[cityName];
  if (!tracker) {
    await chrome.alarms.clear(`${TRACKER_ALARM_PREFIX}${cityName}`);
    return;
  }

  const nextCheck = Date.now() + tracker.intervalMinutes * 60 * 1000;
  await updateTrackerTimestamp(cityName, nextCheck);

  const slots = await checkAvailableSlots(tracker.tabId);
  if (slots.length > 0) {
    await handleFoundSlots(cityName, tracker.tabId, slots);
  }
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith(TRACKER_ALARM_PREFIX)) {
    const cityName = alarm.name.slice(TRACKER_ALARM_PREFIX.length);
    void handleAlarmCheck(cityName);
  }
});

chrome.tabs.onRemoved.addListener(async (closedTabId) => {
  const trackers = await getStoredActiveTrackers();
  const trackerEntry = Object.values(trackers).find((t) => t.tabId === closedTabId);
  if (trackerEntry) {
    await stopTrackerSession(trackerEntry.cityName);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'STOP_BADGE_BLINK') {
    void stopBadgeBlinking();
  }
});
