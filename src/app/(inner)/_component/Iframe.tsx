'use client';
import { themeAtom } from '@/app/_lib/atom';
import { openWindow } from '@inner/_lib/windowEvent';
import { useAtomValue } from 'jotai';
import { useRef, useEffect, useState, MouseEvent } from 'react';
import * as styles from './iframe.css';

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

  const resiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('reciveFromChild', event.data);
  };

  useEffect(() => {
    if (isLoaded === false) return;
    window.addEventListener('message', resiveMsgFromChild);
    return () => window.removeEventListener('message', resiveMsgFromChild);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded === false) return;
    postMsgToChild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, theme]);

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <iframe
          ref={iframeRef}
          id="liveuta-iframe"
          className={styles.iframe}
          src={url}
          scrolling="auto"
          allow="clipboard-write;"
          onLoad={() => {
            setIsLoaded(() => true);
          }}
        />
      </div>
      <button className={styles.openButton} onClick={onClick}>
        + 새로 열기
      </button>
    </div>
  );
}
