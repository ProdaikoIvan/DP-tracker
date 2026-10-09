import { getItem } from './storageService';
import { NOTIFICATIONS_SOUND_KEY } from '@/constants/storage.constants';

const playNotificationSound = (): void => {
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + index * 0.12;
      const duration = 1.2;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    setTimeout(() => {
      void ctx.close();
    }, 2000);
  } catch {
    // Audio playback error fallback
  }
};

const isSoundNotificationEnabled = async (): Promise<boolean> => {
  const enabled = await getItem<boolean>(NOTIFICATIONS_SOUND_KEY);
  return enabled !== false;
};

export const playNotificationSoundInTab = async (tabId: number): Promise<void> => {
  const isEnabled = await isSoundNotificationEnabled();
  if (!isEnabled) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: playNotificationSound,
    });
  } catch {
    // Ignore script injection errors
  }
};
