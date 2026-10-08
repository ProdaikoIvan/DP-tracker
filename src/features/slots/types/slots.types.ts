export interface SlotDay {
  datePart: string;
  date: string;
  isAllowed: boolean;
}

export interface ServiceSlotsData {
  cityName: string;
  slots: SlotDay[];
  foundAt: number;
}

export type SlotsDataMap = Record<string, ServiceSlotsData>;
