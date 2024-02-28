// https://github.com/arye321/nextauth-google-popup-login
// https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B6%80%EB%AA%A8%EC%B0%BD-%E2%9E%9C-%EC%9E%90%EC%8B%9D%EC%B0%BD%EC%9D%98-%EA%B0%92-%EC%A0%84%EB%8B%AC
const popupCenter = (url: string, target: string, w: number, h: number) => {
  if (typeof window === 'undefined') return;
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    target,
    `width=${w},height=${h},top=${top},left=${left},popup=true`,
  );

  newWindow?.focus();

  return newWindow;
};

export default popupCenter;
