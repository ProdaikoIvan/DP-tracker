import type { StorageArea } from '@/types/storage.types';

export const getItem = async <T>(key: string, area: StorageArea = 'local'): Promise<T | null> => {
  const result = await chrome.storage[area].get(key);
  return (result[key] as T) ?? null;
};

export const setItem = async <T>(key: string, value: T, area: StorageArea = 'local'): Promise<void> => {
  await chrome.storage[area].set({ [key]: value });
};

export const removeItem = async (key: string, area: StorageArea = 'local'): Promise<void> => {
  await chrome.storage[area].remove(key);
};

export const updateItem = async <T extends object>(
  key: string,
  data: Partial<T>,
  area: StorageArea = 'local'
): Promise<void> => {
  const current = (await getItem<T>(key, area)) || ({} as T);
  await setItem(key, Object.assign(current, data), area);
};

export const removeField = async <T extends object>(
  key: string,
  field: string,
  area: StorageArea = 'local'
): Promise<void> => {
  const current = (await getItem<T>(key, area)) || ({} as T);
  delete (current as Record<string, unknown>)[field];
  await setItem(key, current, area);
};
