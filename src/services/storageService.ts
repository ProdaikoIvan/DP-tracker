export const getItem = async <T>(key: string): Promise<T | null> => {
  const result = await chrome.storage.local.get(key);
  return (result[key] as T) ?? null;
};

export const setItem = async <T>(key: string, value: T): Promise<void> => {
  await chrome.storage.local.set({ [key]: value });
};

export const removeItem = async (key: string): Promise<void> => {
  await chrome.storage.local.remove(key);
};
