import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    if (isLoaded === false || !isDesktop || videoId === '') return;
    console.log('liveChat load');
    window.addEventListener('message', resiveMsgFromChild);
    () => window.removeEventListener('message', resiveMsgFromChild);
  }, [isLoaded]);

  if (!isDesktop || videoId === '') return null;

  return (
    <iframe
      ref={iframeRef}
      className="liveChat"
      src={url}
      // sandbox="allow-scripts allow-same-origin allow-presentation"
      // seamless
      onLoad={() => {
        setIsLoaded(() => true);
      }}
    />
  );
};

export default LiveChat;
