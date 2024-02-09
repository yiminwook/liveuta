'use client';

export const clipText = (string: string) => {
  window.navigator.clipboard.writeText(string).then(() => {});
};

export const openWindow = (url: string) => {
  window.open(url);
};
