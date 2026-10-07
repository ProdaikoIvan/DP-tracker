import { departments } from '../data/departments';
import type { SelectedDepartment } from '../types/departments.types';
import type { TrackingState } from '../types/tracking.types';

const departmentByHost = new Map<string, SelectedDepartment>(
  departments.flatMap((country) =>
    country.cities.map((city) => [new URL(city.url).hostname.toLowerCase(), { city, country }])
  )
);

export const findDepartmentByUrl = (targetUrl?: string): SelectedDepartment | null => {
  if (!targetUrl) return null;
  try {
    return departmentByHost.get(new URL(targetUrl).hostname.toLowerCase()) ?? null;
  } catch {
    return null;
  }
};

export const getActiveTab = async (): Promise<chrome.tabs.Tab | undefined> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

export const detectCurrentDepartment = async (): Promise<SelectedDepartment | null> => {
  const activeTab = await getActiveTab();
  return activeTab?.url ? findDepartmentByUrl(activeTab.url) : null;
};

export const resolveInitialDepartment = async (
  trackingState?: TrackingState
): Promise<SelectedDepartment | null> => {
  if (trackingState?.isTracking && trackingState.cityName) {
    for (const country of departments) {
      const city = country.cities.find((c) => c.name === trackingState.cityName);
      if (city) return { city, country };
    }
  }
  return detectCurrentDepartment();
};

export const openDepartmentTab = async (url: string): Promise<void> => {
  const activeTab = await getActiveTab();
  if (activeTab?.url?.startsWith(url)) return;
  await chrome.tabs.create({ url });
};
