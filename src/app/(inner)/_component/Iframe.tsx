'use client';
import { themeAtom } from '@/app/_lib/atom';
import iframe from './iframe.module.scss';
import { openWindow } from '@inner/_lib/windowEvent';
import { useAtomValue } from 'jotai';
import { useRef, useEffect, useState, MouseEvent } from 'react';

interface IframeProps {
  url: string;
}

const Iframe = ({ url }: IframeProps) => {
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
    () => window.removeEventListener('message', resiveMsgFromChild);
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded === false) return;
    postMsgToChild();
  }, [isLoaded, theme]);

  return (
    <section className={iframe['iframe']}>
      <div>
        <iframe
          ref={iframeRef}
          id="liveuta-iframe"
          src={url}
          scrolling="auto"
          allow="clipboard-write;"
          onLoad={() => {
            setIsLoaded(() => true);
          }}
        />
      </div>
      <button onClick={onClick}>+ 새로 열기</button>
    </section>
  );
};

export default Iframe;
