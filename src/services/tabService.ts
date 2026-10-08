import { departments } from '../data/departments';
import type { SelectedDepartment } from '../types/departments.types';

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

export const resolveInitialDepartment = async (): Promise<SelectedDepartment | null> => {
  return detectCurrentDepartment();
};

export const getDepartmentTab = async (cityUrl: string): Promise<chrome.tabs.Tab | undefined> => {
  try {
    const cityHost = new URL(cityUrl).hostname.toLowerCase();
    const activeTab = await getActiveTab();
    if (activeTab?.url && new URL(activeTab.url).hostname.toLowerCase() === cityHost) {
      return activeTab;
    }

    const tabs = await chrome.tabs.query({});
    return tabs.find((t) => {
      if (!t.url) return false;
      try {
        return new URL(t.url).hostname.toLowerCase() === cityHost;
      } catch {
        return false;
      }
    });
  } catch {
    return undefined;
  }
};

export const openDepartmentTab = async (url: string): Promise<void> => {
  const existingTab = await getDepartmentTab(url);
  if (existingTab?.id) {
    await chrome.tabs.update(existingTab.id, { active: true });
    return;
  }
  await chrome.tabs.create({ url, active: true });
};

export const ensureDepartmentTab = async (cityUrl: string): Promise<chrome.tabs.Tab> => {
  const existingTab = await getDepartmentTab(cityUrl);
  if (existingTab?.id) {
    await chrome.tabs.update(existingTab.id, { active: true });
    return existingTab;
  }
  return chrome.tabs.create({ url: cityUrl, active: true });
};

export const findDepartmentByCityName = (cityName: string): SelectedDepartment | null => {
  for (const country of departments) {
    const city = country.cities.find((c) => c.name === cityName);
    if (city) return { city, country };
  }
  return null;
};

