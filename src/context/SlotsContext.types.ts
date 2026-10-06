import type { ReactNode } from 'react';
import type { SlotDay } from '../services/slotService.types';

export interface StoredSlotsData {
  slots: SlotDay[];
  foundAt: string;
}

export interface SlotsContextValue {
  foundSlots: SlotDay[];
  foundAt: string;
  saveSlots: (slots: SlotDay[], foundAt: string) => Promise<void>;
  clearSlots: () => Promise<void>;
}

export interface SlotsProviderProps {
  children: ReactNode;
}
