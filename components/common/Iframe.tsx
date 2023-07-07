'use client';
import iframe from '@/components/common/iframe.module.scss';
import { openWindow } from '@/utils/windowEvent';

interface IframeProps {
  url: string;
}

const Iframe = ({ url }: IframeProps) => {
  const onClick = () => {
    openWindow(url);
  };

  return (
    <section className={iframe['iframe']}>
      <div>
        <iframe id="liveuta-iframe" src={url} scrolling="no" allow="clipboard-write;" />
      </div>
      <button onClick={onClick}>+ 새로 열기</button>
    </section>
  );
};

export default Iframe;
