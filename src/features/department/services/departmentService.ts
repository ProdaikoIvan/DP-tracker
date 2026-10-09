import { departments } from '../data/departments.data';
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

const findDepartmentByUrl = (targetUrl?: string): SelectedDepartment | null => {
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
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return activeTab?.url ? findDepartmentByUrl(activeTab.url) : null;
};

export const openDepartmentTab = async (cityUrl: string): Promise<chrome.tabs.Tab> => {
  const host = new URL(cityUrl).hostname;
  const tabs = await chrome.tabs.query({});
  const existing = tabs.find((t) => t.url?.includes(host));

  if (existing?.id) {
    await chrome.tabs.update(existing.id, { active: true });
    return existing;
  }

  return chrome.tabs.create({ url: cityUrl, active: true });
};
