import addToast from './handleToast';

export const clipText = (string: string) => {
  window.navigator.clipboard.writeText(string).then(() => {
    addToast('success', '클립보드에 복사되었습니다.');
  });
};

export const openWindow = (url: string) => {
  window.open(url);
};
