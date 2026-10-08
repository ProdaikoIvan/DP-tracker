export const getActiveTab = async (): Promise<chrome.tabs.Tab | undefined> => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

export const findTabByUrl = async (targetUrl: string): Promise<chrome.tabs.Tab | undefined> => {
  try {
    const targetHost = new URL(targetUrl).hostname.toLowerCase();
    const activeTab = await getActiveTab();
    if (activeTab?.url && new URL(activeTab.url).hostname.toLowerCase() === targetHost) {
      return activeTab;
    }

    const tabs = await chrome.tabs.query({});
    return tabs.find((t) => {
      if (!t.url) return false;
      try {
        return new URL(t.url).hostname.toLowerCase() === targetHost;
      } catch {
        return false;
      }
    });
  } catch {
    return undefined;
  }
};

export const ensureTab = async (url: string): Promise<chrome.tabs.Tab> => {
  const existingTab = await findTabByUrl(url);
  if (existingTab?.id) {
    await chrome.tabs.update(existingTab.id, { active: true });
    return existingTab;
  }
  return chrome.tabs.create({ url, active: true });
};
