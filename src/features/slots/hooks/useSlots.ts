import { useMemo } from 'react';
import { useStorage } from '@/hooks';
import { SLOTS_STORAGE_KEY } from '@/constants/storage.constants';
import type { SlotsDataMap } from '../types/slots.types';
import type { UseSlotsResult } from './useSlots.types';

export const useSlots = (): UseSlotsResult => {
  const [slotsMap] = useStorage<SlotsDataMap>(SLOTS_STORAGE_KEY, {});

  const totalSlots = useMemo(
    () => Object.values(slotsMap).reduce((sum, item) => sum + item.slots.length, 0),
    [slotsMap]
  );

  const servicesWithSlotsCount = useMemo(
    () => Object.values(slotsMap).filter((item) => item.slots.length > 0).length,
    [slotsMap]
  );

  return {
    slotsMap,
    totalSlots,
    servicesWithSlotsCount,
  };
};
