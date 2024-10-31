'use client';
import { ORIGIN } from '@/constants';
import { BREAK_POINT } from '@/styles/var';
import { playerVideoIdAtom } from '@/stores/player';
import popupCenter from '@/utils/popup';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import MediaQuery from 'react-responsive';
import * as styles from './player.css';

export default function LiveChat() {
  const [videoId] = useAtom(playerVideoIdAtom);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <MediaQuery minWidth={BREAK_POINT.lg}>
      <div className={styles.liveChatBox}>
        <button className={styles.popButton} onClick={openPopup}>
          POP
        </button>
        <iframe
          ref={iframeRef}
          className={styles.liveChat}
          src={url}
          // sandbox="allow-scripts allow-same-origin allow-presentation"
          // seamless
          onLoad={() => setIsLoaded(() => true)}
        />
      </div>
    </MediaQuery>
  );
}
