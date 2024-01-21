interface LiveChatProp {
  videoId: string;
  isTablet: boolean;
}

const DOMAIN = 'liveuta.vercel.app';

const LiveChat = ({ videoId, isTablet }: LiveChatProp) => {
  if (isTablet || videoId === '') return null;

  return (
    <iframe
      className="liveChat"
      src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${DOMAIN}&dark_theme=1`}
    />
  );
};

export default LiveChat;
