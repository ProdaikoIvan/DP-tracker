import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../services/storageService';
import { setSlotsBadge, clearSlotsBadge } from '../services/badgeService';
import { SLOTS_STORAGE_KEY } from '../constants/storage.constants';
import type { SlotDay } from '../services/slotService.types';
import type {
  StoredSlotsData,
  SlotsContextValue,
  SlotsProviderProps,
} from './SlotsContext.types';

const SlotsContext = createContext<SlotsContextValue | null>(null);

export const SlotsProvider: React.FC<SlotsProviderProps> = ({ children }) => {
  const [foundSlots, setFoundSlots] = useState<SlotDay[]>([]);
  const [foundAt, setFoundAt] = useState('');

  useEffect(() => {
    void getItem<StoredSlotsData>(SLOTS_STORAGE_KEY).then((data) => {
      if (data) {
        setFoundSlots(data.slots);
        setFoundAt(data.foundAt);
      }
    });
  }, []);

  const saveSlots = async (slots: SlotDay[], timestamp: string): Promise<void> => {
    setFoundSlots(slots);
    setFoundAt(timestamp);
    await setItem(SLOTS_STORAGE_KEY, { slots, foundAt: timestamp });
    await setSlotsBadge(slots.length);
  };

  const clearSlots = async (): Promise<void> => {
    setFoundSlots([]);
    setFoundAt('');
    await removeItem(SLOTS_STORAGE_KEY);
    await clearSlotsBadge();
  };

  return (
    <SlotsContext.Provider value={{ foundSlots, foundAt, saveSlots, clearSlots }}>
      {children}
    </SlotsContext.Provider>
  );
};

export const useSlots = (): SlotsContextValue => {
  const context = useContext(SlotsContext);
  if (!context) {
    throw new Error('useSlots must be used within a SlotsProvider');
  }
  return context;
};
