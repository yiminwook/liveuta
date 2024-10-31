export const clipText = (string: string) => {
  if (typeof window === 'undefined') return;
  window.navigator.clipboard.writeText(string).then(() => {});
};

export const openWindow = (url: string) => {
  if (typeof window === 'undefined') return;
  window.open(url);
};
