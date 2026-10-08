export interface FormExtractionData {
  url: string;
  csrf: string;
  serviceCenterId: string;
  serviceId: string;
}

export interface SlotDay {
  datePart: string;
  date: string;
  isAllowed: boolean;
}

export interface SlotsResponse {
  days: SlotDay[];
}
