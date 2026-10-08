import type { SlotDay } from '../types/slots.types';

export interface FormExtractionData {
  url: string;
  csrf: string;
  serviceCenterId: string;
  serviceId: string;
}

export interface SlotsResponse {
  days: SlotDay[];
}
