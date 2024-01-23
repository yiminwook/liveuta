import popupCenter from '@/utils/popup';
import { useEffect, useRef, useState } from 'react';
import { LiveChatBox, PopButton } from '@/components/common/player/Style';

const DOMAIN = 'liveuta.vercel.app';

interface LiveChatProp {
  videoId: string;
  isDesktop: boolean;
}

const LiveChat = ({ videoId, isDesktop }: LiveChatProp) => {
  const url = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${DOMAIN}&dark_theme=1`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const resiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('reciveFromChild', event.data);
  };

  const openPopup = () => {
    popupCenter(url, '_blank', 300, 600);
  };

  useEffect(() => {
    if (isLoaded === false || !isDesktop) return;
    console.log('liveChat load');
    window.addEventListener('message', resiveMsgFromChild);
    () => window.removeEventListener('message', resiveMsgFromChild);
  }, [isLoaded]);

  if (!isDesktop) return null;

  return (
    <LiveChatBox>
      <PopButton onClick={openPopup}>POP</PopButton>
      <iframe
        ref={iframeRef}
        className="liveChat"
        src={url}
        // sandbox="allow-scripts allow-same-origin allow-presentation"
        // seamless
        onLoad={() => setIsLoaded(() => true)}
      />
    </LiveChatBox>
  );
};

export default LiveChat;
