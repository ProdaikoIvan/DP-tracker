import { removeItem, removeField, updateItem } from '@/services/storageService';
import { SLOTS_STORAGE_KEY } from '@/constants/storage.constants';
import { getFormDataFromPage } from './htmlParserService';
import type { FormExtractionData } from './htmlParserService.types';
import type { SlotsResponse } from './slotService.types';
import type { SlotDay, SlotsDataMap } from '../types/slots.types';

export const clearSlotsForCity = async (cityName: string): Promise<void> => {
  await removeField<SlotsDataMap>(SLOTS_STORAGE_KEY, cityName);
};

export const clearAllSlotsData = async (): Promise<void> => {
  await removeItem(SLOTS_STORAGE_KEY);
};

export const saveFoundSlots = async (cityName: string, slots: SlotDay[]): Promise<void> => {
  await updateItem<SlotsDataMap>(SLOTS_STORAGE_KEY, {
    [cityName]: { cityName, slots, foundAt: Date.now() },
  });
};

const fetchSlots = async (tabId: number, data: FormExtractionData): Promise<SlotDay[]> => {
  try {
    const [injectionResult] = await chrome.scripting.executeScript({
      target: { tabId },
      args: [data],
      func: async (params: FormExtractionData) => {
        try {
          const body = new FormData();
          body.append('form', 'days');
          body.append('ServiceCenterId', params.serviceCenterId);
          body.append('ServiceId', params.serviceId);
          body.append(params.csrf, '1');

          const response = await fetch(params.url, {
            method: 'POST',
            body,
            headers: { Accept: 'application/json, text/plain, */*' },
          });

          const json = (await response.json()) as SlotsResponse;
          return json.days ?? [];
        } catch {
          return [];
        }
      },
    });

    return (injectionResult?.result as SlotDay[]) ?? [];
  } catch {
    return [];
  }
};

export const checkAvailableSlots = async (tabId: number): Promise<SlotDay[] | null> => {
  const formData = await getFormDataFromPage(tabId);
  if (!formData) return null;
  return fetchSlots(tabId, formData);
};
