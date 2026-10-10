import { getItem, setItem, updateItem } from '@/services/storageService';
import { TELEGRAM_CONFIG_STORAGE_KEY, DEFAULT_TELEGRAM_CONFIG } from '../constants/telegram.constants';
import type { TelegramConfig } from '../types/telegram.types';
import type { SlotDay } from '@/features/slots';
import { findDepartmentByCityName } from '@/features/department';

export const getTelegramConfig = async (): Promise<TelegramConfig> => {
  const config = await getItem<TelegramConfig>(TELEGRAM_CONFIG_STORAGE_KEY);
  return config ? { ...DEFAULT_TELEGRAM_CONFIG, ...config } : DEFAULT_TELEGRAM_CONFIG;
};

export const saveTelegramConfig = async (patch: Partial<TelegramConfig>): Promise<TelegramConfig> => {
  const current = await getTelegramConfig();
  const updated: TelegramConfig = { ...current, ...patch };
  await updateItem<TelegramConfig>(TELEGRAM_CONFIG_STORAGE_KEY, updated);
  return updated;
};

export const generateConnectionCode = (): string => {
  return 'dp_' + Math.random().toString(36).substring(2, 8);
};

export const checkConnectionStatus = async (code: string, workerUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(`${workerUrl}/check?code=${encodeURIComponent(code)}`);
    if (!response.ok) return false;
    const data = (await response.json()) as { connected?: boolean };
    return Boolean(data.connected);
  } catch {
    return false;
  }
};

const sendPost = async (workerUrl: string, code: string, text: string): Promise<boolean> => {
  try {
    const response = await fetch(`${workerUrl}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, text }),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const sendTelegramNotification = async (cityName: string, slots: SlotDay[]): Promise<boolean> => {
  const config = await getTelegramConfig();
  if (!config.isConnected || !config.isEnabled || !config.code) return false;

  const department = findDepartmentByCityName(cityName);
  const cityUrl = department?.city.url;

  const datesList = slots.map((s) => `📅 ${s.date}`).slice(0, 5).join('\n');
  const extra = slots.length > 5 ? `\n<i>...та ще ${slots.length - 5} вільних дат</i>` : '';
  
  const linkText = cityUrl 
    ? `\n\n👉 <a href="${cityUrl}"><b>Перейдіть на сайт для запису!</b></a>` 
    : `\n\n👉 <i>Перейдіть на сайт для запису!</i>`;

  const text = `🔥 <b>Знайдено вільні дати!</b>\n\n📍 <b>Місто:</b> ${cityName}\n${datesList}${extra}${linkText}`;

  return sendPost(config.workerUrl, config.code, text);
};

export const sendTestNotification = async (): Promise<boolean> => {
  const config = await getTelegramConfig();
  if (!config.isConnected || !config.code) return false;

  const text = '🔔 <b>Тестове сповіщення від DP Tracker</b>\n\nTelegram успішно підключено до розширення!';
  return sendPost(config.workerUrl, config.code, text);
};

export const disconnectTelegram = async (): Promise<void> => {
  const current = await getTelegramConfig();
  await setItem<TelegramConfig>(TELEGRAM_CONFIG_STORAGE_KEY, {
    ...current,
    code: null,
    isConnected: false,
  });
};
