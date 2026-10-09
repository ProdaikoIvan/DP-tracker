import type { FormExtractionData } from './htmlParserService.types';

export const getFormDataFromPage = async (tabId: number): Promise<FormExtractionData | null> => {
  try {
    const [injectionResult] = await chrome.scripting.executeScript({
      target: { tabId },
      func: async () => {
        try {
          const res = await fetch(window.location.href, { cache: 'no-cache' });
          const html = await res.text();

          const doc = new DOMParser().parseFromString(html, 'text/html');
          const form = doc.querySelector<HTMLFormElement>('form#services');
          if (!form) return null;

          const match = (form.getAttribute('x-data') || '').match(/qlogickFormHaku\((\{[\s\S]*?\})\)/);
          if (!match) return null;

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
