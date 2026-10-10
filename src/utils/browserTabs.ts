export const openTabWithUrl = async (url: string): Promise<chrome.tabs.Tab> => {
  const host = new URL(url).hostname;
  const tabs = await chrome.tabs.query({});
  const existing = tabs.find((t) => t.url?.includes(host));

  if (existing?.id) {
    await chrome.tabs.update(existing.id, { active: true });
    return existing;
  }

  return chrome.tabs.create({ url, active: true });
};

export const getActiveTabUrl = async (): Promise<string | null> => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return activeTab?.url ?? null;
};
