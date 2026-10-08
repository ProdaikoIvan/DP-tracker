import { stopBadgeBlinking } from '@/services/badgeService';
import { TRACKER_ALARM_PREFIX } from '@/constants/storage.constants';
import { handleTrackerAlarm, handleTabClosed } from '@/features/tracker';

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith(TRACKER_ALARM_PREFIX)) {
    const cityName = alarm.name.slice(TRACKER_ALARM_PREFIX.length);
    void handleTrackerAlarm(cityName);
  }
});

chrome.tabs.onRemoved.addListener((closedTabId) => {
  void handleTabClosed(closedTabId);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'STOP_BADGE_BLINK') {
    void stopBadgeBlinking();
  }
});
