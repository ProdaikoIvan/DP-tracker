import { BADGE_ACTIVE_COLOR } from '../constants/storage.constants';

export const setSlotsBadge = async (count: number): Promise<void> => {
  await chrome.action.setBadgeBackgroundColor({ color: BADGE_ACTIVE_COLOR });
  await chrome.action.setBadgeText({ text: count > 0 ? String(count) : '' });
};

export const clearSlotsBadge = async (): Promise<void> => {
  await chrome.action.setBadgeText({ text: '' });
};
