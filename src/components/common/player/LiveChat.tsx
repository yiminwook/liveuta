'use client';
import { ORIGIN } from '@/constants';
import { playerVideoIdAtom } from '@/stores/player';
import popupCenter from '@/utils/popup';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import css from './Player.module.scss';

export default function LiveChat() {
  const [videoId] = useAtom(playerVideoIdAtom);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${variable.breakpointLg})`);
  const url = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${ORIGIN}&dark_theme=1`;

  const resiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('reciveFromChild', event.data);
  };

  const openPopup = () => {
    popupCenter(url, '_blank', 350, 700);
  };

  useEffect(() => {
    if (isLoaded === false) return;
    console.log('liveChat load');
    window.addEventListener('message', resiveMsgFromChild);
    return () => window.removeEventListener('message', resiveMsgFromChild);
  }, [isLoaded]);

  if (!isDesktop) return null;

  return (
    <div className={css.liveChatBox}>
      <button className={css.popBtn} onClick={openPopup}>
        POP
      </button>
      <iframe
        ref={iframeRef}
        className={css.liveChat}
        src={url}
        // sandbox="allow-scripts allow-same-origin allow-presentation"
        // seamless
        onLoad={() => setIsLoaded(() => true)}
      />
    </div>
  );
}
