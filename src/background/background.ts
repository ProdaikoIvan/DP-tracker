import { getItem, setItem } from '../services/storageService';
import { checkAvailableSlots } from '../services/slotService';
import {
  TRACKING_STATE_KEY,
  TRACKING_ALARM_NAME,
} from '../constants/storage.constants';
import type { TrackingState } from '../types/tracking.types';
import { handleFoundSlots, stopTrackingSession } from '../services/trackingService';

const handleAlarmCheck = async (): Promise<void> => {
  const state = await getItem<TrackingState>(TRACKING_STATE_KEY);
  if (!state?.isTracking || !state.tabId || !state.cityName) {
    await chrome.alarms.clear(TRACKING_ALARM_NAME);
    return;
  }

  const nextCheck = Date.now() + state.intervalMinutes * 60 * 1000;
  await setItem<TrackingState>(TRACKING_STATE_KEY, {
    ...state,
    nextCheckTimestamp: nextCheck,
  });

  const slots = await checkAvailableSlots(state.tabId);
  if (slots.length > 0) {
    await handleFoundSlots(state.cityName, state.tabId, slots);
  }
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === TRACKING_ALARM_NAME) {
    void handleAlarmCheck();
  }
});

chrome.tabs.onRemoved.addListener(async (closedTabId) => {
  const state = await getItem<TrackingState>(TRACKING_STATE_KEY);
  if (state?.isTracking && state.tabId === closedTabId) {
    await stopTrackingSession(state);
  }
});
