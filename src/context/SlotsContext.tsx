import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, removeItem } from '../services/storageService';
import { setSlotsBadge, clearSlotsBadge } from '../services/badgeService';
import { SLOTS_STORAGE_KEY } from '../constants/storage.constants';
import type { SlotDay } from '../services/slotService.types';
import type {
  ServiceSlotsData,
  SlotsDataMap,
  SlotsContextValue,
  SlotsProviderProps,
} from './SlotsContext.types';

const SlotsContext = createContext<SlotsContextValue | null>(null);

export const calculateTotalSlots = (map: SlotsDataMap): number =>
  Object.values(map).reduce((sum, item) => sum + item.slots.length, 0);

const updateBadgeForMap = async (map: SlotsDataMap): Promise<void> => {
  const total = calculateTotalSlots(map);
  if (total > 0) {
    await setSlotsBadge(total);
  } else {
    await clearSlotsBadge();
  }
};

export const SlotsProvider: React.FC<SlotsProviderProps> = ({ children }) => {
  const [slotsMap, setSlotsMap] = useState<SlotsDataMap>({});

  useEffect(() => {
    void getItem<SlotsDataMap>(SLOTS_STORAGE_KEY).then((data) => {
      if (data) {
        setSlotsMap(data);
        void updateBadgeForMap(data);
      }
    });
  }, []);

  const getServiceSlots = (cityName: string): ServiceSlotsData | undefined => {
    return slotsMap[cityName];
  };

  const saveSlotsForService = async (
    cityName: string,
    slots: SlotDay[],
    timestamp: string
  ): Promise<void> => {
    const updatedMap: SlotsDataMap = {
      ...slotsMap,
      [cityName]: { cityName, slots, foundAt: timestamp },
    };
    setSlotsMap(updatedMap);
    await setItem(SLOTS_STORAGE_KEY, updatedMap);
    await updateBadgeForMap(updatedMap);
  };

  const clearSlotsForService = async (cityName: string): Promise<void> => {
    if (!slotsMap[cityName]) return;
    const { [cityName]: _, ...updatedMap } = slotsMap;
    setSlotsMap(updatedMap);
    await setItem(SLOTS_STORAGE_KEY, updatedMap);
    await updateBadgeForMap(updatedMap);
  };

  const clearAllSlots = async (): Promise<void> => {
    setSlotsMap({});
    await removeItem(SLOTS_STORAGE_KEY);
    await clearSlotsBadge();
  };

  const totalSlots = calculateTotalSlots(slotsMap);

  return (
    <SlotsContext.Provider
      value={{
        slotsMap,
        totalSlots,
        getServiceSlots,
        saveSlotsForService,
        clearSlotsForService,
        clearAllSlots,
      }}
    >
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
