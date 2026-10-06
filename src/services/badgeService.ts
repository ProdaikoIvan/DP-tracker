import { BADGE_ACTIVE_COLOR, BADGE_ALERT_COLOR } from '../constants/storage.constants';

let blinkInterval: ReturnType<typeof setInterval> | null = null;

export const startBadgeBlinking = async (): Promise<void> => {
  if (blinkInterval) return;
  await chrome.action.setBadgeText({ text: '!' });
  await chrome.action.setBadgeBackgroundColor({ color: BADGE_ACTIVE_COLOR });

  let isGreen = true;
  blinkInterval = setInterval(() => {
    isGreen = !isGreen;
    void chrome.action.setBadgeBackgroundColor({
      color: isGreen ? BADGE_ACTIVE_COLOR : BADGE_ALERT_COLOR,
    });
  }, 700);
};

export const stopBadgeBlinking = async (): Promise<void> => {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }
  await chrome.action.setBadgeText({ text: '' });
};
