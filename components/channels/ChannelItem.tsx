import { ChannelsDataType } from '@/models/youtube/InChannel';
import Image from 'next/image';

interface ChannelItemProps {
  channel: ChannelsDataType;
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { uid, channelName, snippet } = channel;
  const profileImage = snippet.thumbnails?.default?.url ?? '/loading.png';
  return (
    <tr>
      <td style={{ position: 'relative', width: '80px', height: '80px' }}>
        <Image src={profileImage} alt="" fill unoptimized />
      </td>
      <td>{channelName}</td>
    </tr>
  );
};

export default ChannelItem;
