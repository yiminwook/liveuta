'use client';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import variable from '@variable';
import { useEffect, useRef, useState } from 'react';
import { ORIGIN } from '@/constants';
import { usePlayer } from '@/stores/player';
import popupCenter from '@/utils/popup';
import css from './player.module.scss';

export default function LiveChat() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = usePlayer((state) => state.videoId);
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
      <Button
        vars={() => ({ root: { '--button-hover': '#ffae00d2' } })}
        radius={5}
        p={5}
        size="sm"
        classNames={{ root: css.popButton }}
        onClick={openPopup}
        bg="orange"
        c="white"
      >
        POP
      </Button>
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
