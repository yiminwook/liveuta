'use client';
import iframe from '@/components/common/iframe.module.scss';
import { openWindow } from '@/utils/windowEvent';
import { useRef } from 'react';

interface IframeProps {
  url: string;
}

const Iframe = ({ url }: IframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onClick = () => {
    openWindow(url);
  };

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
