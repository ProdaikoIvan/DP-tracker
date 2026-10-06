import { departments } from '../data/departments';
import type { SelectedDepartment } from '../types/departments.types';

const normalizeUrl = (rawUrl: string): string => {
  try {
    const url = new URL(rawUrl);
    return `${url.hostname}${url.pathname}`.toLowerCase().replace(/\/$/, '');
  } catch {
    return rawUrl.toLowerCase().replace(/\/$/, '');
  }
};

export const findDepartmentByUrl = (targetUrl?: string): SelectedDepartment | null => {
  if (!targetUrl) return null;
  const normalizedTarget = normalizeUrl(targetUrl);

  for (const country of departments) {
    for (const city of country.cities) {
      const normalizedCityUrl = normalizeUrl(city.url);
      if (
        normalizedTarget.startsWith(normalizedCityUrl) ||
        normalizedCityUrl.startsWith(normalizedTarget)
      ) {
        return { city, country };
      }
    }
  }

  try {
    const targetHost = new URL(targetUrl).hostname.toLowerCase();
    for (const country of departments) {
      for (const city of country.cities) {
        const cityHost = new URL(city.url).hostname.toLowerCase();
        if (targetHost === cityHost && targetHost.includes('pasport.org.ua')) {
          return { city, country };
        }
      }
    }
  } catch {
    // Ignore URL parsing errors
  }

  return null;
};

export const detectCurrentDepartment = async (): Promise<SelectedDepartment | null> => {
  if (typeof chrome === 'undefined' || !chrome.tabs?.query) {
    return null;
  }

  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab?.url) {
      const match = findDepartmentByUrl(activeTab.url);
      if (match) return match;
    }

    const allTabs = await chrome.tabs.query({});
    for (const tab of allTabs) {
      if (tab.url) {
        const match = findDepartmentByUrl(tab.url);
        if (match) return match;
      }
    }
  } catch (error) {
    console.error('Error detecting current department tab:', error);
  }

  return null;
};

export const openDepartmentTab = async (url: string): Promise<void> => {
  if (typeof chrome === 'undefined' || !chrome.tabs?.query) {
    window.open(url, '_blank');
    return;
  }

  try {
    const normalizedTarget = normalizeUrl(url);
    const tabs = await chrome.tabs.query({});
    const existingTab = tabs.find(
      (t) => t.url && normalizeUrl(t.url).startsWith(normalizedTarget)
    );

    if (existingTab?.id) {
      await chrome.tabs.update(existingTab.id, { active: true });
      if (existingTab.windowId) {
        await chrome.windows.update(existingTab.windowId, { focused: true });
      }
    } else {
      await chrome.tabs.create({ url });
    }
  } catch (error) {
    console.error('Error opening department tab:', error);
    window.open(url, '_blank');
  }
};
