import { toast } from 'react-toastify';

export const clipText = (string: string) => {
  window.navigator.clipboard.writeText(string).then(() => {
    toast.success('클립보드에 복사되었습니다');
  });
};

export const openWindow = (url: string) => {
  window.open(url);
};
