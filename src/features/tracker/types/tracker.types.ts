export type PollingInterval = 1 | 2 | 3 | 5;

export interface ActiveTracker {
  cityName: string;
  countryCode: string;
  tabId: number;
  intervalMinutes: PollingInterval;
  nextCheckTimestamp: number;
}

export type ActiveTrackersMap = Record<string, ActiveTracker>;
