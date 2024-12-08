'use client';
import { themeAtom } from '@/stores/atom';
import { openWindow } from '@/utils/windowEvent';
import { useAtomValue } from 'jotai';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import css from './Iframe.module.scss';

interface IframeProps {
  url: string;
}

export default function Iframe({ url }: IframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useAtomValue(themeAtom);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    openWindow(url);
  };

  const postMsgToChild = () => {
    const childWindow = iframeRef.current?.contentWindow;
    if (!childWindow) return;

    const msg = {
      action: 'themeChange',
      theme,
    };

    childWindow.postMessage(msg, url);
  };

  const receiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('receiveFromChild', event.data);
  };

  useEffect(() => {
    if (isLoaded === false) return;
    window.addEventListener('message', receiveMsgFromChild);
    return () => window.removeEventListener('message', receiveMsgFromChild);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded === false) return;
    postMsgToChild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, theme]);

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <iframe
          ref={iframeRef}
          id="liveuta-iframe"
          className={css.iframe}
          src={url}
          scrolling="auto"
          allow="clipboard-write;"
          onLoad={() => {
            setIsLoaded(() => true);
          }}
        />
      </div>
      <button className={css.openButton} onClick={onClick}>
        + 새로 열기
      </button>
    </div>
  );
}
