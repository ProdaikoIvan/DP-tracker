import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/services/storageService';
import type { StorageArea } from '@/types/storage.types';

export const useStorage = <T>(
  key: string,
  initialValue: T,
  area: StorageArea = 'local'
): [T, (val: T | ((prev: T) => T)) => Promise<void>] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    void getItem<T>(key, area).then((stored) => {
      if (stored !== null) {
        setValue(stored);
      }
    });

    const handleStorageChange = (
      changes: { [k: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === area && changes[key]) {
        setValue((changes[key].newValue as T) ?? initialValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, [key, area, initialValue]);

  const updateValue = useCallback(
    async (val: T | ((prev: T) => T)): Promise<void> => {
      setValue((current) => {
        const nextVal = typeof val === 'function' ? (val as (prev: T) => T)(current) : val;
        void setItem(key, nextVal, area);
        return nextVal;
      });
    },
    [key, area]
  );

  return [value, updateValue];
};
