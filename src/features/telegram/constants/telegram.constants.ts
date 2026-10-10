import type { TelegramConfig } from '../types/telegram.types';

export const TELEGRAM_CONFIG_STORAGE_KEY = 'dp_tracker_telegram_config';

export const DEFAULT_TELEGRAM_CONFIG: TelegramConfig = {
  code: null,
  isConnected: false,
  isEnabled: true,
  workerUrl: 'https://dp-tracker-telegram.prodaikoivan.workers.dev',
  botUsername: 'dp_tracker_notify_bot',
};
