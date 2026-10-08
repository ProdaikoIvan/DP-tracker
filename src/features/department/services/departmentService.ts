import { departments } from '../data/departments.data';
import { getActiveTab, ensureTab } from '@/services/tabService';
import type { SelectedDepartment } from '../types/department.types';

const departmentByHost = new Map<string, SelectedDepartment>(
  departments.flatMap((country) =>
    country.cities.map((city) => [new URL(city.url).hostname.toLowerCase(), { city, country }])
  )
);

const departmentByName = new Map<string, SelectedDepartment>(
  departments.flatMap((country) =>
    country.cities.map((city) => [city.name.toLowerCase(), { city, country }])
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

export const findDepartmentByCityName = (cityName: string): SelectedDepartment | null => {
  return departmentByName.get(cityName.toLowerCase()) ?? null;
};

export const detectCurrentDepartment = async (): Promise<SelectedDepartment | null> => {
  const activeTab = await getActiveTab();
  return activeTab?.url ? findDepartmentByUrl(activeTab.url) : null;
};

export const openDepartmentTab = async (cityUrl: string): Promise<chrome.tabs.Tab> => {
  return ensureTab(cityUrl);
};
