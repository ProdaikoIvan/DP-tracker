import type {
  FormExtractionData,
  SlotDay,
  SlotsResponse,
} from './slotService.types';

export const getFormDataFromPage = async (tabId: number): Promise<FormExtractionData | null> => {
  try {
    const [injectionResult] = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const form = document.querySelector<HTMLFormElement>('form#services');
        if (!form) return null;

        const match = (form.getAttribute('x-data') || '').match(/qlogickFormHaku\((\{[\s\S]*?\})\)/);
        if (!match) return null;

        try {
          const config = JSON.parse(match[1]);
          return {
            url: config.url,
            csrf: config.csrf,
            serviceCenterId: config.center,
            serviceId: '4',
          };
        } catch {
          return null;
        }
      },
    });

    return (injectionResult?.result as FormExtractionData) ?? null;
  } catch {
    return null;
  }
};

export const fetchSlots = async (tabId: number, data: FormExtractionData): Promise<SlotDay[]> => {
  try {
    const [injectionResult] = await chrome.scripting.executeScript({
      target: { tabId },
      args: [data],
      func: async (params: FormExtractionData) => {
        try {
          const body = new FormData();
          body.append('form', 'days');
          body.append('ServiceCenterId', params.serviceCenterId);
          body.append('ServiceId', params.serviceId);
          body.append(params.csrf, '1');

          const response = await fetch(params.url, {
            method: 'POST',
            body,
            headers: { Accept: 'application/json, text/plain, */*' },
          });

          const json = (await response.json()) as SlotsResponse;
          return json.days || [];
        } catch {
          return [];
        }
      },
    });

    return (injectionResult?.result as SlotDay[]) || [];
  } catch {
    return [];
  }
};

export const checkAvailableSlots = async (tabId: number): Promise<SlotDay[]> => {
  const data = await getFormDataFromPage(tabId);
  if (!data) return [];
  return fetchSlots(tabId, data);
};
