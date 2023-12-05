'use client';
import { themeAtom } from '@/atoms';
import iframe from '@/components/common/iframe.module.scss';
import { openWindow } from '@/utils/windowEvent';
import { useAtomValue } from 'jotai';
import { useRef, useEffect } from 'react';

interface IframeProps {
  url: string;
}

const CHILD_CHILD_ORIGIN = 'https://append-new-vchan.vercel.app';

const Iframe = ({ url }: IframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const theme = useAtomValue(themeAtom);

  const onClick = () => {
    openWindow(url);
  };

  const postMsgToChild = () => {
    const childWindow = iframeRef.current?.contentWindow;
    if (!childWindow) return;

    const msg = {
      action: 'themeChange',
      theme,
    };

    childWindow.postMessage(msg, CHILD_CHILD_ORIGIN);
  };

  const resiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== CHILD_CHILD_ORIGIN) return;
    console.log('reciveFromChild', event.data);
  };

  useEffect(() => {
    const child = iframeRef.current?.contentWindow;
    if (!child) return;

    window.addEventListener('message', resiveMsgFromChild);
    () => window.removeEventListener('message', resiveMsgFromChild);
  }, []);

  useEffect(() => {
    postMsgToChild();
  }, [theme]);

  return (
    <section className={iframe['iframe']}>
      <div>
        <iframe ref={iframeRef} id="liveuta-iframe" src={url} scrolling="auto" allow="clipboard-write;" />
      </div>
      <button onClick={onClick}>+ 새로 열기</button>
    </section>
  );
};

export default Iframe;
