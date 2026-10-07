export const formatFoundAt = (timestamp?: number): string => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return `${date.toLocaleDateString('uk-UA')} о ${date.toLocaleTimeString('uk-UA')}`;
};
